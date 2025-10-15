import CentralizedWrapper from "@/components/CentralizedWrapper";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import CustomInputField from "@/components/CustomInputField";
import { Mail, User, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function SignupPage() {
  return (
    <CentralizedWrapper>
      <div className="w-full max-w-sm space-y-4">
        <Card className="gap-3 border-0 bg-white/80 shadow-md backdrop-blur-sm">
          <CardHeader>
            <div className="space-y-2">
              <CardTitle className="text-xl font-bold text-gray-900">
                Sign Up
              </CardTitle>
              <CardDescription className="text-gray-600">
                Create your account
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <form className="space-y-4">
              <CustomInputField
                id="username"
                icon={User}
                labelText="Username"
                type="text"
                placeholder="John Doe"
              />
              <CustomInputField
                id="email"
                icon={Mail}
                labelText="Email Address"
                type="email"
                placeholder="john@example.com"
              />
              <CustomInputField
                id="password"
                icon={Lock}
                labelText="Password"
                type="password"
                placeholder="Password"
              />
              <CustomInputField
                id="confirm-password"
                icon={Lock}
                labelText="Confirm Password"
                type="password"
                placeholder="Confirm Password"
              />
              <Button type="submit" className="h-10 w-full">
                Sign Up
              </Button>
            </form>
            <div className="text-muted-foreground text-center text-sm">
              Already have an account?{" "}
              <Link to="/auth/login" className="text-blue-400 hover:underline">
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </CentralizedWrapper>
  );
}

export default SignupPage;
