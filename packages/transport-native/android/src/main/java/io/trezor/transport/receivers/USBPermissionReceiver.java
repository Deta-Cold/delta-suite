package io.detahard.transport.receivers;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.hardware.usb.UsbDevice;
import android.hardware.usb.UsbManager;
import android.util.Log;

import io.detahard.transport.bridges.USBBridge;

public class USBPermissionReceiver extends BroadcastReceiver {
  private static final String TAG = "detahard USBPermissionReceiver";
  private static USBPermissionReceiver instance;
  private Context context;

  public static final String USB_PERMISSION_GRANTED = "io.detahard.transport.USB_PERMISSION";

  public static USBPermissionReceiver getInstance(Context context) {
    if (instance == null) {
      instance = new USBPermissionReceiver();
    }
    return instance;
  }

  @Override
  public void onReceive(Context context, Intent intent) {
    Log.d(TAG, "received intent" + intent.toString());
    String action = intent.getAction();
    Log.d(TAG, "received intent action" + intent.getAction());
    UsbDevice device = intent.getParcelableExtra(UsbManager.EXTRA_DEVICE);
    if (USB_PERMISSION_GRANTED.equals(action)) {
      if (intent.getBooleanExtra(UsbManager.EXTRA_PERMISSION_GRANTED, false)) {
        Log.d(TAG, "permission granted adding device");
        USBBridge usbBridge = USBBridge.getInstance(context);
        usbBridge.addDeviceToList(new USBBridge.detahardDevice(device));
      }
    }
  }
}
