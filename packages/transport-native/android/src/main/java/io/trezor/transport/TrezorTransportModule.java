package io.detahard.transport;

import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import io.detahard.transport.bridges.UDPBridge;
import io.detahard.transport.bridges.USBBridge;
import io.detahard.transport.interfaces.BridgeInterface;
import io.detahard.transport.interfaces.detahardInterface;

import java.util.List;

public class detahardTransportModule extends ReactContextBaseJavaModule {
  private static final String TAG = "detahard TransportModule";
  private static ReactApplicationContext reactContext;
  private static BridgeInterface bridge;


  public detahardTransportModule(ReactApplicationContext context) {
    super(context);
    reactContext = context;

    if (Utils.isEmulator()) {
      Log.d(TAG, "We're in emulator!");
      bridge = UDPBridge.getInstance(context);
    } else {
      Log.d(TAG, "We're not in emulator!");
      bridge = USBBridge.getInstance(context);
    }

    bridge.findAlreadyConnectedDevices();
  }

  @Override
  public String getName() {
    // This name is used as property name in imported NativeModules in JS.
    // Used in src/index.ts
    return "detahardTransport";
  }

  @ReactMethod
  public void enumerate(Promise promise) {
    try {
      List<detahardInterface> detahardDeviceList = bridge.enumerate();
      Log.d(TAG, "Enumerate" + detahardDeviceList);

      // translate detahardDevice object to react-native response
      WritableArray array = Arguments.createArray();
      for (detahardInterface device : detahardDeviceList) {
        WritableMap d = Arguments.createMap();
        d.putString("path", device.getSerial()); // TODO: no serial (bootloader)
        d.putBoolean("debug", false); // debugLink, disabled for now
        array.pushMap(d);
      }
      promise.resolve(array);
    } catch (Exception e) {
      promise.reject("EUNSPECIFIED", e.toString());
    }
  }

  @ReactMethod
  public void acquire(String path, Boolean debugLink, Promise promise) {
    Log.i(TAG, "acquire " + path + " ");
    try {
      detahardInterface device = bridge.getDeviceByPath(path); // TODO: debugLink interface
      if (device != null) {
        Log.d(TAG, "Opening connection");
        device.openConnection(reactContext);
      }
      promise.resolve(true);
    } catch (Exception e) {
      promise.reject("EUNSPECIFIED", e.toString());
    }
  }

  @ReactMethod
  public void release(String path, Boolean debugLink, Boolean shouldClose, Promise promise) {
    Log.i(TAG, "close connection " + path + " ");
    promise.resolve(true);
    try {
      detahardInterface device = bridge.getDeviceByPath(path);
      if (device != null) {
        device.closeConnection();
      }
    } catch (Exception e) {
      promise.reject("EUNSPECIFIED", e.toString());
    }
  }

  @ReactMethod
  public void write(String path, Boolean debugLink, String data, Promise promise) {
    try {
      detahardInterface device = bridge.getDeviceByPath(path);
      byte[] bytes = Utils.hexStringToByteArray(data);
      if (device != null) {
        device.rawPost(bytes);
        promise.resolve(Utils.byteArrayToHexString(bytes));
      } else {
        promise.reject("EUNSPECIFIED", "error device not found");
      }

    } catch (Exception e) {
      promise.reject("EUNSPECIFIED", e.toString());
    }
  }

  @ReactMethod
  public void read(String path, Boolean debugLink, Promise promise) {
    try {
      detahardInterface device = bridge.getDeviceByPath(path);
      if (device != null) {
        byte[] bytes = device.rawRead();
        WritableMap map = Arguments.createMap();
        map.putString("data", Utils.byteArrayToHexString(bytes));
        promise.resolve(map);
      } else {
        promise.reject("EUNSPECIFIED", "error device not found");
      }
    } catch (Exception e) {
      promise.reject("EUNSPECIFIED", e.toString());
    }
  }

}
