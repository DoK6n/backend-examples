/*
  static 키워드로 선언된 메서드는 인스턴스에 바인딩되지 않고, 클래스 자체에 바인딩됩니다.  
  따라서 static 메서드 내부에서 선언된 변수는 클래스의 스코프에 바인딩되며, 해당 변수는 static 메서드가 호출될 때마다 메모리에 다시 할당됩니다.  
  즉, IpAddress.current를 호출할 때마다 ifaces 변수와 ip 변수는 재할당되며, 이전에 저장된 값은 메모리에서 해제됩니다.  
  따라서 IpAddress.current를 호출하는 동안에만 메모리에 ifaces 변수와 ip 변수가 유지됩니다.  
  또한, ifaces 변수와 ip 변수는 IpAddress 클래스의 스코프에만 존재하며, 클래스 외부에서는 접근할 수 없습니다.  
  이는 클래스의 캡슐화와 정보은닉에 기여하며, 안정적인 코드를 작성하는 데 도움을 줍니다.  
 */

import {
  hostname,
  networkInterfaces,
  platform,
  type,
  userInfo,
  version,
} from 'os';

/**
 * os 모듈로 서버가 실행되는 os 환경의 ip 주소를 가져옵니다.
 *
 * - 현재 지원되는 os
 * |Windows|MacOs|
 * |-|-|
 * |Wi-Fi|이더넷|
 * |Wi-Fi|이더넷|
 */
export class IpAddress {
  /**
   * 현재 OS의 정보를 가져옵니다.
   */
  static get osInfo() {
    return {
      hostname: hostname(),
      platform: platform(),
      type: type(),
      userInfo: userInfo(),
      version: version(),
    };
  }

  /**
   * 현재 OS의 IP 주소를 가져옵니다.
   */
  static get current() {
    const ifaces = networkInterfaces();
    let ip = '';
    Object.keys(ifaces).forEach((key) => {
      ifaces[key]?.forEach((details) => {
        if (
          (key.indexOf('Wi-Fi') !== -1 || // windows
            key.indexOf('이더넷') !== -1 || // windows
            key.indexOf('en6') !== -1 || // macOS 이더넷
            key.indexOf('en0') !== -1) && // macOS Wi-Fi
          details.family === 'IPv4'
        ) {
          ip = details.address;
        }
      });
    });
    return ifaces.hasOwnProperty('Wi-Fi') ||
      ifaces.hasOwnProperty('이더넷') ||
      ifaces.hasOwnProperty('en6') ||
      ifaces.hasOwnProperty('en0')
      ? ip
      : 'localhost';
  }
}
