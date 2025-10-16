import CentralizedWrapper from "@/components/CentralizedWrapper";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import CustomInputField from "@/components/CustomInputField";
import { Mail, User, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useSignupForm } from "@/hooks/useLogicForm";
import useAuthStore from "@/store/auth.js";
import { AnimatePresence, motion } from "motion/react";

function SignupPage() {
  const navigate = useNavigate();

  const { signUp, isLoading, error } = useAuthStore();

  const { register, handleSubmit, errors } = useSignupForm(async (data) => {
    const [err, user] = await signUp(data.email, data.password, data.username);
    if (!err && user) {
      navigate("/dashboard");
    }
  });

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
            <form className="space-y-4" onSubmit={handleSubmit}>
              {error && (
                <AnimatePresence>
                  <motion.p
                    initial={{ opacity: 0, y: -10, scale: 0 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs text-red-500"
                  >
                    {error}
                  </motion.p>
                </AnimatePresence>
              )}
              <CustomInputField
                id="username"
                icon={User}
                labelText="Username"
                type="text"
                placeholder="John Doe"
                register={register("username")}
                error={errors.username?.message}
              />
              <CustomInputField
                id="email"
                icon={Mail}
                labelText="Email Address"
                type="email"
                placeholder="john@example.com"
                register={register("email")}
                error={errors.email?.message}
              />
              <CustomInputField
                id="password"
                icon={Lock}
                labelText="Password"
                type="password"
                placeholder="Password"
                register={register("password")}
                error={errors.password?.message}
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="h-10 w-full"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Spinner />
                    Signing Up...
                  </span>
                ) : (
                  "Sign Up"
                )}
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
