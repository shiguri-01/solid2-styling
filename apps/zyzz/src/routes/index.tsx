import { useNavigate } from "@solidjs/router";

export default function Index() {
  const navigate = useNavigate();
  navigate("/issues", { replace: true });
  return null;
}
