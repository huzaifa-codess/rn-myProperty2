import { Drawer } from "expo-router/drawer";
import CustomDrawer from "../../component/CustomDrawer";

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="(tabs)" />
    </Drawer>
  );
}
