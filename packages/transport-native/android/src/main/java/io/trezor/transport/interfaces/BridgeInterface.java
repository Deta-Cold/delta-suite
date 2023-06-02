package io.detahard.transport.interfaces;

import java.util.List;

public interface BridgeInterface {
  List<detahardInterface> enumerate();

  detahardInterface getDeviceByPath(String path);

  void findAlreadyConnectedDevices();
}
