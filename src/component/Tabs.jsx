import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Tab = () => {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className={"flex justify-between"}>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  );
};

export default Tab;
