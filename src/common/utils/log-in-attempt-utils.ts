import * as uaParser from 'ua-parser-js';
import * as geoip from 'geoip-lite';

export function getInfoOfUserAgent(userAgent: string) {
    const uaResult = uaParser(userAgent);
    const deviceType: string = uaResult.device.type || 'Unknow';
    const operatingSystem: string = uaResult.os.name || 'Unknow';
    const browser: string = uaResult.browser.name || 'Unknow';

    return {
        deviceType,
        operatingSystem,
        browser,
    }
}

export function getLocationByIp(clientIp: string) {
    const geo = geoip.lookup(clientIp);
    return (geo ? `${geo.city}, ${geo.country}` : 'Unknown location');
}