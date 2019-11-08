package co.frontyard.cordova.plugin.exoplayer;

import android.app.Activity;
import android.app.Dialog;
import android.content.DialogInterface;
import android.content.DialogInterface.OnDismissListener;
import android.content.DialogInterface.OnKeyListener;
import android.media.AudioManager;
import android.media.AudioManager.OnAudioFocusChangeListener;
import android.net.Uri;
import android.os.Handler;
import android.util.Log;
import android.view.KeyEvent;
import android.view.MotionEvent;
import android.view.View;
import android.view.View.OnTouchListener;
import android.widget.FrameLayout;
import com.google.android.exoplayer2.DefaultLoadControl;
import com.google.android.exoplayer2.ExoPlaybackException;
import com.google.android.exoplayer2.ExoPlayerFactory;
import com.google.android.exoplayer2.Format;
import com.google.android.exoplayer2.PlaybackParameters;
import com.google.android.exoplayer2.SimpleExoPlayer;
import com.google.android.exoplayer2.Timeline;
import com.google.android.exoplayer2.ExoPlayer.EventListener;
import com.google.android.exoplayer2.drm.DrmInitData;
import com.google.android.exoplayer2.extractor.DefaultExtractorsFactory;
import com.google.android.exoplayer2.source.AdaptiveMediaSourceEventListener;
import com.google.android.exoplayer2.source.ExtractorMediaSource;
import com.google.android.exoplayer2.source.MediaSource;
import com.google.android.exoplayer2.source.MergingMediaSource;
import com.google.android.exoplayer2.source.SingleSampleMediaSource;
import com.google.android.exoplayer2.source.TrackGroupArray;
import com.google.android.exoplayer2.source.dash.DashMediaSource;
import com.google.android.exoplayer2.source.dash.DefaultDashChunkSource.Factory;
import com.google.android.exoplayer2.source.hls.HlsMediaSource;
import com.google.android.exoplayer2.source.smoothstreaming.SsMediaSource;
import com.google.android.exoplayer2.trackselection.DefaultTrackSelector;
import com.google.android.exoplayer2.trackselection.TrackSelectionArray;
import com.google.android.exoplayer2.ui.SimpleExoPlayerView;
import com.google.android.exoplayer2.ui.PlaybackControlView.VisibilityListener;
import com.google.android.exoplayer2.upstream.DefaultBandwidthMeter;
import com.google.android.exoplayer2.upstream.DefaultDataSourceFactory;
import com.google.android.exoplayer2.upstream.DefaultHttpDataSourceFactory;
import com.google.android.exoplayer2.util.Util;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult.Status;
import org.json.JSONObject;

public class Player {
   private static final String TAG = "ExoPlayerPlugin";
   private final Activity activity;
   private OnAudioFocusChangeListener audioFocusChangeListener = new OnAudioFocusChangeListener() {
      public void onAudioFocusChange(int var1) {
         if (var1 == -2) {
            JSONObject var5 = Payload.audioFocusEvent(Player.this.exoPlayer, "AUDIOFOCUS_LOSS_TRANSIENT");
            (new CallbackResponse(Player.this.callbackContext)).send(Status.OK, var5, true);
         } else if (var1 == -3) {
            JSONObject var4 = Payload.audioFocusEvent(Player.this.exoPlayer, "AUDIOFOCUS_LOSS_TRANSIENT_CAN_DUCK");
            (new CallbackResponse(Player.this.callbackContext)).send(Status.OK, var4, true);
         } else if (var1 == 1) {
            JSONObject var3 = Payload.audioFocusEvent(Player.this.exoPlayer, "AUDIOFOCUS_GAIN");
            (new CallbackResponse(Player.this.callbackContext)).send(Status.OK, var3, true);
         } else {
            if (var1 == -1) {
               JSONObject var2 = Payload.audioFocusEvent(Player.this.exoPlayer, "AUDIOFOCUS_LOSS");
               (new CallbackResponse(Player.this.callbackContext)).send(Status.OK, var2, true);
            }

         }
      }
   };
   private AudioManager audioManager;
   private final CallbackContext callbackContext;
   private final Configuration config;
   private int controllerVisibility;
   private Dialog dialog;
   private OnDismissListener dismissListener = new OnDismissListener() {
      public void onDismiss(DialogInterface var1) {
         if (Player.this.exoPlayer != null) {
            Player.this.exoPlayer.release();
         }

         Player.this.exoPlayer = null;
         JSONObject var3 = Payload.stopEvent(Player.this.exoPlayer);
         (new CallbackResponse(Player.this.callbackContext)).send(Status.OK, var3, true);
      }
   };
   private SimpleExoPlayer exoPlayer;
   private SimpleExoPlayerView exoView;
   private OnKeyListener onKeyListener = new OnKeyListener() {
      public boolean onKey(DialogInterface var1, int var2, KeyEvent var3) {
         var3.getAction();
         String var5 = KeyEvent.keyCodeToString(var3.getKeyCode());
         if (!var5.equals("KEYCODE_VOLUME_UP") && !var5.equals("KEYCODE_VOLUME_DOWN") && !var5.equals("KEYCODE_VOLUME_MUTE")) {
            JSONObject var6 = Payload.keyEvent(var3);
            (new CallbackResponse(Player.this.callbackContext)).send(Status.OK, var6, true);
            return true;
         } else {
            return false;
         }
      }
   };
   private OnTouchListener onTouchListener = new OnTouchListener() {
      int previousAction = -1;

      public boolean onTouch(View var1, MotionEvent var2) {
         int var3 = var2.getAction();
         if (this.previousAction != var3) {
            this.previousAction = var3;
            JSONObject var4 = Payload.touchEvent(var2);
            (new CallbackResponse(Player.this.callbackContext)).send(Status.OK, var4, true);
         }

         return true;
      }
   };
   private boolean paused = false;
   private VisibilityListener playbackControlVisibilityListener = new VisibilityListener() {
      public void onVisibilityChange(int var1) {
         Player.this.controllerVisibility = var1;
      }
   };
   private EventListener playerEventListener = new EventListener() {
      public void onLoadingChanged(boolean var1) {
         JSONObject var2 = Payload.loadingEvent(Player.this.exoPlayer, var1);
         (new CallbackResponse(Player.this.callbackContext)).send(Status.OK, var2, true);
      }

      public void onPlaybackParametersChanged(PlaybackParameters var1) {
         Log.i("ExoPlayerPlugin", "Playback parameters changed");
      }

      public void onPlayerError(ExoPlaybackException var1) {
         JSONObject var2 = Payload.playerErrorEvent(Player.this.exoPlayer, var1, (String)null);
         (new CallbackResponse(Player.this.callbackContext)).send(Status.ERROR, var2, true);
      }

      public void onPlayerStateChanged(boolean var1, int var2) {
         SimpleExoPlayer var3 = Player.this.exoPlayer;
         boolean var4;
         if (Player.this.controllerVisibility == 0) {
            var4 = true;
         } else {
            var4 = false;
         }

         JSONObject var5 = Payload.stateEvent(var3, var2, var4);
         (new CallbackResponse(Player.this.callbackContext)).send(Status.OK, var5, true);
      }

      public void onPositionDiscontinuity() {
         JSONObject var1 = Payload.positionDiscontinuityEvent(Player.this.exoPlayer);
         (new CallbackResponse(Player.this.callbackContext)).send(Status.OK, var1, true);
      }

      public void onTimelineChanged(Timeline var1, Object var2) {
         JSONObject var3 = Payload.timelineChangedEvent(Player.this.exoPlayer, var1, var2);
         (new CallbackResponse(Player.this.callbackContext)).send(Status.OK, var3, true);
      }

      public void onTracksChanged(TrackGroupArray var1, TrackSelectionArray var2) {
      }
   };
   private CordovaWebView webView;

   public Player(Configuration var1, Activity var2, CallbackContext var3, CordovaWebView var4) {
      this.config = var1;
      this.activity = var2;
      this.callbackContext = var3;
      this.webView = var4;
      this.audioManager = (AudioManager)var2.getSystemService("audio");
   }

   private MediaSource getMediaSource(Uri var1, DefaultBandwidthMeter var2) {
      String var3 = Util.getUserAgent(this.activity, this.config.getUserAgent());
      Handler var4 = new Handler();
      DefaultHttpDataSourceFactory var5 = new DefaultHttpDataSourceFactory(var3, var2, 10000, 10000, true);
      DefaultDataSourceFactory var6 = new DefaultDataSourceFactory(this.activity, var2, var5);
      Object var8;
      switch(Util.inferContentType(var1)) {
      case 0:
         Factory var7 = new Factory(var6);
         var8 = new DashMediaSource(var1, var6, var7, 10, -1L, var4, (AdaptiveMediaSourceEventListener)null);
         break;
      case 1:
         com.google.android.exoplayer2.source.smoothstreaming.DefaultSsChunkSource.Factory var20 = new com.google.android.exoplayer2.source.smoothstreaming.DefaultSsChunkSource.Factory(var6);
         var8 = new SsMediaSource(var1, var6, var20, var4, (AdaptiveMediaSourceEventListener)null);
         break;
      case 2:
         var8 = new HlsMediaSource(var1, var6, 10, var4, (AdaptiveMediaSourceEventListener)null);
         break;
      default:
         DefaultExtractorsFactory var21 = new DefaultExtractorsFactory();
         var8 = new ExtractorMediaSource(var1, var6, var21, var4, (com.google.android.exoplayer2.source.ExtractorMediaSource.EventListener)null);
      }

      String var9 = this.config.getSubtitleUrl();
      if (var9 != null) {
         Uri var10 = Uri.parse(var9);
         String var11 = inferSubtitleType(var10);
         StringBuilder var12 = new StringBuilder();
         var12.append("Subtitle present: ");
         var12.append(var10);
         var12.append(", type=");
         var12.append(var11);
         Log.i("ExoPlayerPlugin", var12.toString());
         Format var18 = Format.createTextSampleFormat((String)null, var11, (String)null, -1, -1, "en", (DrmInitData)null);
         SingleSampleMediaSource var19 = new SingleSampleMediaSource(var10, var5, var18, -9223372036854775807L);
         return new MergingMediaSource(new MediaSource[]{(MediaSource)var8, var19});
      } else {
         return (MediaSource)var8;
      }
   }

   private static String inferSubtitleType(Uri var0) {
      return var0.getPath().toLowerCase().endsWith(".vtt") ? "text/vtt" : "application/x-subrip";
   }

   private void pause() {
      this.paused = true;
      this.exoPlayer.setPlayWhenReady(false);
   }

   private void play() {
      this.paused = false;
      this.exoPlayer.setPlayWhenReady(true);
   }

   private void preparePlayer(Uri var1) {
      String var2;
      if (this.setupAudio() == 0) {
         var2 = "AUDIOFOCUS_REQUEST_FAILED";
      } else {
         var2 = "AUDIOFOCUS_REQUEST_GRANTED";
      }

      DefaultBandwidthMeter var3 = new DefaultBandwidthMeter();
      DefaultTrackSelector var4 = new DefaultTrackSelector();
      DefaultLoadControl var5 = new DefaultLoadControl();
      this.exoPlayer = ExoPlayerFactory.newSimpleInstance(this.activity, var4, var5);
      this.exoPlayer.addListener(this.playerEventListener);
      SimpleExoPlayerView var6 = this.exoView;
      if (var6 != null) {
         var6.setPlayer(this.exoPlayer);
      }

      MediaSource var7 = this.getMediaSource(var1, var3);
      if (var7 != null) {
         long var11 = this.config.getSeekTo();
         if (var11 > -1L) {
            this.exoPlayer.seekTo(var11);
         }

         this.exoPlayer.prepare(var7);
         this.exoPlayer.setPlayWhenReady(true);
         JSONObject var13 = Payload.startEvent(this.exoPlayer, var2);
         (new CallbackResponse(this.callbackContext)).send(Status.OK, var13, true);
      } else {
         StringBuilder var8 = new StringBuilder();
         var8.append("Failed to construct mediaSource for ");
         var8.append(var1);
         this.sendError(var8.toString());
      }
   }

   private void sendError(String var1) {
      Log.e("ExoPlayerPlugin", var1);
      JSONObject var3 = Payload.playerErrorEvent(this.exoPlayer, (ExoPlaybackException)null, var1);
      (new CallbackResponse(this.callbackContext)).send(Status.ERROR, var3, true);
   }

   private int setupAudio() {
      this.activity.setVolumeControlStream(3);
      return this.audioManager.requestAudioFocus(this.audioFocusChangeListener, 3, 1);
   }

   public void close() {
      this.audioManager.abandonAudioFocus(this.audioFocusChangeListener);
      SimpleExoPlayer var2 = this.exoPlayer;
      if (var2 != null) {
         var2.release();
         this.exoPlayer = null;
      }

      Dialog var3 = this.dialog;
      if (var3 != null) {
         var3.dismiss();
      }

   }

   public void createDialog() {
      this.dialog = new Dialog(this.activity, 16973834);
      this.dialog.setOnKeyListener(this.onKeyListener);
      this.dialog.getWindow().getAttributes().windowAnimations = 16973826;
      this.dialog.requestWindowFeature(1);
      this.dialog.getWindow().getDecorView().setSystemUiVisibility(5894);
      this.dialog.setCancelable(true);
      this.dialog.setOnDismissListener(this.dismissListener);
      FrameLayout var2 = LayoutProvider.getMainLayout(this.activity);
      this.exoView = LayoutProvider.getExoPlayer(this.activity, this.config);
      this.exoView.setControllerVisibilityListener(this.playbackControlVisibilityListener);
      var2.addView(this.exoView);
      this.dialog.setContentView(var2);
      this.dialog.show();
      this.dialog.getWindow().setAttributes(LayoutProvider.getDialogLayoutParams(this.activity, this.config, this.dialog));
      this.exoView.requestFocus();
      this.exoView.setOnTouchListener(this.onTouchListener);
      LayoutProvider.setupController(this.exoView, this.activity, this.config.getController());
   }

   public void createPlayer() {
      if (!this.config.isAudioOnly()) {
         this.createDialog();
      }

      this.preparePlayer(this.config.getUri());
   }

   public JSONObject getPlayerState() {
      SimpleExoPlayer var1 = this.exoPlayer;
      int var2;
      if (var1 != null) {
         var2 = var1.getPlaybackState();
      } else {
         var2 = 4;
      }

      boolean var3;
      if (this.controllerVisibility == 0) {
         var3 = true;
      } else {
         var3 = false;
      }

      return Payload.stateEvent(var1, var2, var3);
   }

   public void hideController() {
      SimpleExoPlayerView var1 = this.exoView;
      if (var1 != null) {
         var1.hideController();
      }

   }

   public void playPause() {
      if (this.paused) {
         this.play();
      } else {
         this.pause();
      }
   }

   public void seekTo(long var1) {
      long var3 = this.exoPlayer.getDuration();
      long var5 = 0L;
      if (var3 != var5) {
         var5 = Math.min(Math.max(var5, var1), this.exoPlayer.getDuration());
      }

      this.exoPlayer.seekTo(var5);
      JSONObject var7 = Payload.seekEvent(this.exoPlayer, var1);
      (new CallbackResponse(this.callbackContext)).send(Status.OK, var7, true);
   }

   public void setController(JSONObject var1) {
      SimpleExoPlayerView var2 = this.exoView;
      if (var2 != null) {
         LayoutProvider.setupController(var2, this.activity, var1);
      }

   }

   public void setStream(Uri var1, JSONObject var2) {
      if (var1 != null) {
         MediaSource var3 = this.getMediaSource(var1, new DefaultBandwidthMeter());
         this.exoPlayer.prepare(var3);
         this.play();
      }

      this.setController(var2);
   }

   public void showController() {
      SimpleExoPlayerView var1 = this.exoView;
      if (var1 != null) {
         var1.showController();
      }

   }

   public void stop() {
      this.paused = false;
      this.exoPlayer.stop();
   }
}
