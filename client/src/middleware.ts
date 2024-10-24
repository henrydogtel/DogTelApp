export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dogs-form",
    "/payment",
    "/sittersPricesDetail",
    "/dashboard",
    "/summary",
  ],
};
