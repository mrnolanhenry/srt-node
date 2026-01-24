abstract class TimeUtils { 
  static convertMillisecsToString(totalMilliSecs: number): string {
    let remainingMillisecs = totalMilliSecs;
    const hrs = Math.floor(remainingMillisecs/(60 * 60 * 1000));
    remainingMillisecs = remainingMillisecs - (hrs * 60 * 60 * 1000);
    const mins = Math.floor(remainingMillisecs/(60 * 1000));
    remainingMillisecs = remainingMillisecs - (mins * 60 * 1000);
    const secs = Math.floor(remainingMillisecs/(1000));
    remainingMillisecs = remainingMillisecs - (secs * 1000);
    const hrsString = this.formatHrMinSec(hrs);
    const minsString = this.formatHrMinSec(mins);
    const secsString = this.formatHrMinSec(secs);
    const millisecsString = this.formatMillisec(remainingMillisecs);
    const timeString =  hrsString + ":" + minsString + ":" + secsString + "," + millisecsString;
    return timeString;
  };
  
  static formatHrMinSec(numberToFormat: number): string {
    const string = numberToFormat.toString();
    let newString = string;
    if (string.length < 2) {
      newString = "0" + newString;
    }
    return newString;
  };
  
  static formatMillisec(numberToFormat: number): string {
    const string = numberToFormat.toString();
    let newString = string;
    if (string.length < 3) {
      if (string.length < 2) {
        newString = "0" + newString;
      }
      newString = "0" + newString;
    }
    return newString;
  };
  
  static convertStringToMillisecs(timeString: string): number | undefined {
    const timeArr = timeString.split(":");
    if (!this.isValidTimeInMillisecs(timeArr)) {
      if (!this.isValidTimeInFps(timeArr)) {
        console.log("time format isn't valid");
        return;
      }
      return this.getMillisecsFromFps(timeArr);
    }
    return this.getMillisecs(timeArr);
  };
  
  static getMillisecs(timeArr: string[]): number {
    const hrs = parseInt(timeArr[0]);
    const mins = parseInt(timeArr[1]);
    const secondArr = timeArr[2].split(",");
    const secs = parseInt(secondArr[0]);
    const millisecs = parseInt(secondArr[1]);
    const totalMilliSecs = hrs * 60 * 60 * 1000 + mins * 60 * 1000 + secs * 1000 + millisecs;
    return totalMilliSecs;
  };

  static getMillisecsFromFps(timeArr: string[]): number {
    const fps = 24;
    const hrs = parseInt(timeArr[0]);
    const mins = parseInt(timeArr[1]);
    const secs = parseInt(timeArr[2]);
    const millisecs = Math.round(parseInt(timeArr[3]) * (1000 / fps));
    const totalMilliSecs = hrs * 60 * 60 * 1000 + mins * 60 * 1000 + secs * 1000 + millisecs;
    return totalMilliSecs;
  };

  static isValidTimeInMillisecs(timeArr: string[]): boolean {
    if (timeArr.length !== 3 || !this.isValidHrMinSec(timeArr[0]) || !this.isValidHrMinSec(timeArr[1])) {
      return false;
    }
    const secondArr = timeArr[2].split(",");
    if (!this.isValidHrMinSec(secondArr[0])) {
      return false;
    }
    if(!this.isValidMilliSec(secondArr[1])) {
      return false;
    }
    return true;
  };
  
  static isValidTimeInFps(timeArr: string[]): boolean {
    if (timeArr.length !== 4 || !this.isValidHrMinSec(timeArr[0]) || !this.isValidHrMinSec(timeArr[1]) || !this.isValidHrMinSec(timeArr[2])) {
      return false;
    }
    if(!this.isValidFps(timeArr[3])) {
      return false;
    }
    return true;
  };

  static isValidTime = (timeArr: string[]): boolean => {
    return this.isValidTimeInMillisecs(timeArr) || this.isValidTimeInFps(timeArr);
  };

  static isValidHrMinSec = (stringToCheck: string): boolean => {
    return !isNaN(parseInt(stringToCheck)) && stringToCheck.length === 2;
  };

  static isValidMilliSec = (stringToCheck: string): boolean => {
    return !isNaN(parseInt(stringToCheck)) && stringToCheck.length === 3;
  };

  static isValidFps = (stringToCheck: string): boolean => {
    return !isNaN(parseInt(stringToCheck)) && stringToCheck.length === 2;
  };
};

export default TimeUtils;
