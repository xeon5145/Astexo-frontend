import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Auth() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Auth</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>Auth</CardDescription>
        </CardContent>
        <CardFooter>
          <CardAction>
            <Button>Login</Button>
          </CardAction>
        </CardFooter>
      </Card>
    </>
  );
}
