import { AppWindow, WindowType } from "@/interfaces/window";
import styles from "./navbar_container.module.css";
import { useEffect, useMemo, useState } from "react";
import NavbarIcon from "./navbar_icon";
export default function Navbar({ windows }: { windows: AppWindow[] }) {
  const defaultIcons = useMemo(
    () => [
      { type: WindowType.Navigator, count: 0, fixed: false },
      { type: WindowType.Image, count: 0, fixed: false },
      { type: WindowType.Video, count: 0, fixed: false },
      { type: WindowType.Audio, count: 0, fixed: false },
      { type: WindowType.Uploader, count: 0, fixed: true },
      { type: WindowType.Trash, count: 0, fixed: true },
      { type: WindowType.Document, count: 0, fixed: false },
    ],
    [],
  );

  const [icons, setIcons] =
    useState<{ type: WindowType; count: number; fixed: boolean }[]>(
      defaultIcons,
    );

  useEffect(() => {
    const newIcons = defaultIcons.map((icon) => {
      const count = windows.filter(
        (window) => window.type === icon.type,
      ).length;
      return { ...icon, count };
    });
    setIcons(newIcons);
  }, [defaultIcons, windows]);

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        {icons.map((icon, index) => (
          <div key={index} className={styles.icon_container}>
            {(icon.fixed || icon.count > 0) && (
              <NavbarIcon windowType={icon.type} windowCount={icon.count} />
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
