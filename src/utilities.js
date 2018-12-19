function dateFromQlikNumber(n) {
  var d = new Date((n - 25569)*86400*1000);
  // since date was created in UTC shift it to the local timezone
  d.setTime( d.getTime() + d.getTimezoneOffset()*60*1000 );
  return d;
}

export function convertToUnixTime(_qNum) {
  return dateFromQlikNumber(_qNum).getTime();
}
