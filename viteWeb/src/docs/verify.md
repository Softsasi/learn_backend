```js
'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type IParams = {
  token: string,
  userId: string,
};

interface ApiResponse {
  code: number;
  successMsg?: string;
  errorMsg?: string;
}

const StatusCheck = ({ searchParams }: { searchParams: IParams }) => {
  const { token, userId } = searchParams;
  const [status, setStatus] = (useState < ApiResponse) | (null > null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/auth/verify-email?token=${token}&userId=${userId}`
        );
        const data: ApiResponse = await response.json();
        setStatus(data);
      } catch (err) {
        setStatus({ code: 500, errorMsg: 'Something went wrong' });
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [token, userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Verifying your email...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="max-w-md w-full shadow-lg rounded-2xl border">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            {status?.code === 200 ? 'Email Verified' : 'Verification Failed'}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          {status?.code === 200 ? (
            <>
              <CheckCircle2 className="text-green-500 w-16 h-16" />
              <p className="text-gray-700 text-center">{status.successMsg}</p>
              <Button className="w-full">Go to Dashboard</Button>
            </>
          ) : (
            <>
              <XCircle className="text-red-500 w-16 h-16" />
              <p className="text-gray-700 text-center">{status?.errorMsg}</p>
              <Button variant="outline" className="w-full">
                Back to Home
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
```
