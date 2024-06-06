export class CommonConstants {
  static readonly apiUrl = process.env.NEXT_PUBLIC_API_URL;
  static readonly hostingUrl = process.env.NEXT_PUBLIC_HOST_URL;
  
  static readonly path = {
    private: ["/contract-manage", "/profile"],
    auth: ["/login", "/register"],
  };

  static dimensions = {
    appBarHeight: 80,
    footerHeight: 200,
    sidebarWidth: 350,
    contentWidth: 1200,
    contentWidthSmaller: 900,
  };

  static spacing = {
    horizontalPadding: 5,
    verticalPadding: 7,
  };

  static images = {
    appLogo: "/images/logo.png",
    notFound: "/images/not-found.jpg",
    // home
    aboutUs: "/images/home/about-us.jpg",
    homeBanner: "/images/home/home-banner.jpeg",
    // auth
    login: "/images/auth/sign-in.png",
    register: "/images/auth/sign-up.png",
    // room
    room1: "/images/room/type1.jpeg",
    room2: "/images/room/type2.jpeg",
    room3: "/images/room/type3.jpeg",
  };

  static icons = {
    visa: "/images/icons/visa.svg",
    mastercard: "/images/icons/master-card.svg",
  };
}

export const CookiesConstant = {
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  role: "role",
  user: "user",
};

export type RequestMethods = "GET" | "POST" | "PUT" | "DELETE";