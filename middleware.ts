export { default } from "next-auth/middleware"

//? เมื่อไม่ได้ login จะไม่สามารถเข้า path ในนี้ได้
export const config = { 
  matcher: [
    "/trips",
    "/reservations",
    "/properties",
    "/favorites"
  ]
};