package io.detahard.transport.interfaces;

import android.content.Context;

import io.detahard.transport.detahardException;

public interface detahardInterface {
  void rawPost(byte[] raw);

  byte[] rawRead();

  void openConnection(Context context) throws detahardException;

  void closeConnection();

  String getSerial();
}
