export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/home",
    "/dogs-form",
    "/payment",
    "/sittersPricesDetail",
    "/dashboard",
    "/summary",
  ],
};
