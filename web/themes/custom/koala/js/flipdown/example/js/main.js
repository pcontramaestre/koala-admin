document.addEventListener("DOMContentLoaded", () => {
  // Unix timestamp (in seconds) to count down to
  var twoDaysFromNow = new Date("2023-06-29T23:00:00-0500").getTime() / 1000;

  // Set up FlipDown
  var flipdown = new FlipDown(twoDaysFromNow)

    // Start the countdown
    .start()

    // Do something when the countdown ends
    .ifEnded(() => {
      console.log("The countdown has ended!");
    });
});
