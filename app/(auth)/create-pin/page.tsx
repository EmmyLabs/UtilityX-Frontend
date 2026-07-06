import AuthPageLayout from "@/components/auth/AuthPageLayout";
import CreatePinForm from "@/components/auth/CreatePinForm";

export const metadata = {
  title: "Create PIN — FusePay",
  description: "Set your transaction PIN.",
};

export default function CreatePinPage() {
  return (
    <AuthPageLayout>
      <CreatePinForm />
    </AuthPageLayout>
  );
}
