package co.frontyard.cordova.plugin.exoplayer;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;
import org.apache.cordova.PluginResult.Status;
import org.json.JSONObject;

public class CallbackResponse {
   private CallbackContext callbackContext;

   public CallbackResponse(CallbackContext var1) {
      this.callbackContext = var1;
   }

   public void send(Status var1, JSONObject var2, boolean var3) {
      if (this.callbackContext != null) {
         PluginResult var4 = new PluginResult(var1, var2);
         var4.setKeepCallback(var3);
         this.callbackContext.sendPluginResult(var4);
      }
   }

   public void send(Status var1, boolean var2) {
      if (this.callbackContext != null) {
         PluginResult var3 = new PluginResult(var1);
         var3.setKeepCallback(var2);
         this.callbackContext.sendPluginResult(var3);
      }
   }
}
