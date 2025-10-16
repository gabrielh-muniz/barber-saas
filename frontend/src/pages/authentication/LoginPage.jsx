import CentralizedWrapper from "@/components/CentralizedWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Mail, Lock } from "lucide-react";
import CustomInputField from "@/components/CustomInputField";
import { Link, useNavigate } from "react-router-dom";
import { useLoginForm } from "@/hooks/useLogicForm";
import useAuthStore from "@/store/auth";
import { motion, AnimatePresence } from "motion/react";

function LoginPage() {
  const navigate = useNavigate();

  const { signIn, isLoading, error } = useAuthStore();

  const { register, handleSubmit, errors } = useLoginForm(async (data) => {
    const [err, user] = await signIn(data.email, data.password);
    if (!err && user) {
      navigate("/dashboard");
    }
  });

  return (
    <CentralizedWrapper>
      <div className="w-full max-w-sm space-y-4">
        <Card className="gap-3 border-0 bg-white/80 shadow-md backdrop-blur-sm">
          <CardHeader className="text-left">
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold text-gray-900">
                Welcome
              </CardTitle>
              <CardDescription className="text-gray-600">
                Sign in to access your dashboard
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Login Form */}
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
                id="email"
                icon={Mail}
                labelText="Email Address"
                type="email"
                placeholder="Email"
                register={register("email")}
                error={errors.email?.message}
              />
              <div className="space-y-1">
                <CustomInputField
                  id="password"
                  icon={Lock}
                  labelText="Password"
                  type="password"
                  placeholder="Password"
                  register={register("password")}
                  error={errors.password?.message}
                />
                <div className="text-right">
                  <a
                    href="#"
                    className="text-sm text-blue-400 hover:text-blue-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="h-11 w-full"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Spinner />
                    Signing In...
                  </span>
                ) : (
                  "Sign In"
                )}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="text-muted-foreground bg-white px-2">
                    or continue with
                  </span>
                </div>
              </div>

              <Button variant="outline" className="h-11 w-full">
                <Mail /> Continue with Google
              </Button>
            </form>

            <div className="text-muted-foreground text-center text-sm">
              Don't have an account?{" "}
              <Link to="/auth/signup" className="text-blue-400 hover:underline">
                Sign up
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

export default LoginPage;
