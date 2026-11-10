import "./AdminAccount.css";
import AdminContactInfo from "../AdminContactInfo/AdminContactInfo";
import AdminSocialLinks from "../AdminSocialLinks/AdminSocialLinks";

export default function AdminAccount() {
  return (
    <div className="admin-account">
      <h2>Account Workspace</h2>
      <AdminContactInfo />
      <AdminSocialLinks />
    </div>
  );
}
