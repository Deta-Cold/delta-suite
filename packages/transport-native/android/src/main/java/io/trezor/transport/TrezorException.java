package io.detahard.transport;

public class detahardException extends RuntimeException {
  public detahardException(String message) {
    super(message);
  }

  public detahardException(String message, Throwable cause) {
    super(message, cause);
  }
}
