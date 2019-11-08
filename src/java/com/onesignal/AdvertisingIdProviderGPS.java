package com.onesignal;

import android.content.Context;

class AdvertisingIdProviderGPS implements AdvertisingIdentifierProvider {
   private static String lastValue;

   static String getLastValue() {
      return lastValue;
   }

   public String getIdentifier(Context param1) {
      // $FF: Couldn't be decompiled
   }
}
