import AuthPageLayout from "@/components/auth/AuthPageLayout";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata = { title: "Create Account — FusePay" };

export default function RegisterPage() {
  return <AuthPageLayout><RegisterForm /></AuthPageLayout>;
}
