import Link from "next/link";
import "tailwindcss/tailwind.css";
import Style from "../components/Navegation.module.css";

const links = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Products",
    route: "/products",
  },
  {
    label: "Notification",
    route: "/notification ",
  },

];

export default function NavigationPage() {
  return (
    <header>
      <nav>
        <ul className="flex justify-center space-x-6 text-gray-600 text-sm font-medium">
          <li className="hover:text-gray-900">
            <Link href="/">Inicio</Link>
          </li>
          <li className="hover:text-gray-900">
            <Link href="/products">Productos</Link>
          </li>
          <li className="hover:text-gray-900">
            <Link href="/notification">Notificaciones</Link>
          </li>

          <li className="hover:text-gray-900">
            <Link href="/shopKart" >Carrito</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}