import AuthPageLayout from "@/components/auth/AuthPageLayout";
import OtpForm from "@/components/auth/OtpForm";

export const metadata = {
  title: "Verify Phone — FusePay",
  description: "Verify your phone number to continue.",
};

export default function OtpPage() {
  return (
    <AuthPageLayout>
      <OtpForm />
    </AuthPageLayout>
  );
}
