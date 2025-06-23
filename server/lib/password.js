const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "pass";

export function adminAuth(req, res, next) {
  const pwd = req.headers["x-admin-password"];
  if (!pwd || pwd !== ADMIN_PASSWORD) {
    return res.status(401).send("Invalid admin password");
  }
  next();
}
