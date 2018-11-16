export default () => {
  if (!this.isRunningCleanUp) {
    var store = this;
    //store.log('starting session cleanup cron job with cron pattern ' + store.cronPattern);
    new CronJob(
      store.cronPattern,
      function() {
        store.cleanUp();
      },
      null,
      true
    );

    this.isRunningCleanUp = true;
  }
}