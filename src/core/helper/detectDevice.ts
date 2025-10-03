export function detectDevice(userAgent: string) {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const isTablet = /iPad|Android(?!.*Mobile)/i.test(userAgent);
  const isDesktop = !isMobile && !isTablet;

  return {
    isMobile,
    isTablet,
    isDesktop,
    userAgent
  };
}

export function detectDeviceFromRequest(request: Request) {
  const userAgent = request.headers.get("user-agent") || "";
  return detectDevice(userAgent);
}
