import "dotenv/config"
import { prisma } from "../lib/prisma"
import { hashUserPassword, createUserJwt } from "../lib/user-security"

async function main() {
  const email = "admin@gmail.com"
  const passwordPlain = "admin12345"
  const passwordHash = await hashUserPassword(passwordPlain)

  const existingAdmin = await prisma.user.findUnique({
    where: { email },
  })

  if (existingAdmin) {
    console.log("Akun admin sudah ada:", existingAdmin.email)
    return
  }

  const created = await prisma.user.create({
    data: {
      kodeUser: "adm0000001",
      fullname: "Super Admin",
      email,
      password: passwordHash,
      role: "admin",
    },
  })

  const token = createUserJwt(created)
  await prisma.user.update({
    where: { id: created.id },
    data: { token },
  })

  console.log("Berhasil membuat akun admin pertama!")
  console.log(`Email: ${email}`)
  console.log(`Password: ${passwordPlain}`)
}

main()
  .catch((e) => {
    console.error("Gagal menjalankan seed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })