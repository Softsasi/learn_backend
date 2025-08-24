import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, XCircle } from 'lucide-react';
import Link from 'next/link';

type IParams = {
  token?: string;
  userId?: string;
};

interface ApiResponse {
  code: number;
  successMsg?: string;
  errorMsg?: string;
}

// ✅ This component runs on the server
const StatusCheck = async ({ searchParams }: { searchParams: IParams }) => {
  const { token, userId } = searchParams;

  if (!token || !userId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="max-w-md w-full shadow-lg rounded-2xl border">
          <CardHeader>
            <CardTitle className="text-center text-xl font-semibold">
              Verification Failed
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <XCircle className="text-red-500 w-16 h-16" />
            <p className="text-gray-700 text-center">
              Missing token or user ID.
            </p>
            <Button variant="outline" className="w-full">
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  let status: ApiResponse;

  try {
    const response = await fetch(
      `http://localhost:8080/auth/verify-email?token=${token}&userId=${userId}`,
      { cache: 'no-store' } // ensures fresh request, no cache
    );
    status = await response.json();
  } catch (err) {
    status = { code: 500, errorMsg: 'Something went wrong' };
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="max-w-md w-full shadow-lg rounded-2xl border">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            {status.code === 200 ? 'Email Verified' : 'Verification Failed'}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          {status.code === 200 ? (
            <>
              <CheckCircle2 className="text-green-500 w-16 h-16" />
              <p className="text-gray-700 text-center">{status.successMsg}</p>
              <Button className="w-full">
                <Link href="/login">Go to Login</Link>
              </Button>
            </>
          ) : (
            <>
              <XCircle className="text-red-500 w-16 h-16" />
              <p className="text-gray-700 text-center">{status.errorMsg}</p>
              <Button variant="outline" className="w-full">
                <Link href="/">Back to Home</Link>
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StatusCheck;
