import MobileDetect from "mobile-detect";

export const getDeviceType = (ctx) => {
  const { req } = ctx;
  const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;
  const md = new MobileDetect(userAgent);
  let mobile = false,
    tablet = false,
    desktop = false;
  if (md.tablet()) {
    tablet = true;
  } else if (md.mobile()) {
    mobile = true;
  } else {
    desktop = true;
  }
  return {
    mobile,
    tablet,
    desktop,
  };
};
