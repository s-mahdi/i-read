import { Card, CardContent, Typography, Grid, Container } from "@mui/material";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useGetAnalytics } from "../../api/hooks/useGetAnalytics";
import moment from "moment-jalaali";

Chart.register(...registerables);

const Analytics = () => {
  const { data: analytics, error, isLoading } = useGetAnalytics();

  if (isLoading) return <div>در حال بارگذاری...</div>;
  if (error) return <div>خطا در بارگذاری آنالیز</div>;

  // Convert dates to Jalali
  const chartData = {
    labels:
      analytics?.last30DaysCount?.map((item) =>
        moment(item.date).format("jYYYY/jMM/jDD")
      ) || [],
    datasets: [
      {
        label: "ثبت نام روزانه",
        data: analytics?.last30DaysCount?.map((item) => item.count) || [],
        borderColor: "#3f51b5",
        backgroundColor: "rgba(63, 81, 181, 0.3)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        grid: {
          display: false, // Remove the X-axis grid lines
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                تعداد ثبت نام در ۳۰ روز گذشته
              </Typography>
              {chartData?.labels.length > 0 && (
                <Line data={chartData} options={chartOptions} />
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                کاربران ثبت نام شده این هفته
              </Typography>
              <Typography variant="h4">
                {analytics?.usersThisWeek || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                پیشرفت ثبت نام
              </Typography>
              <Typography variant="h4">
                {analytics?.registrationProgress || 0}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                کل ثبت نام‌ها
              </Typography>
              <Typography variant="h4">{analytics?.totalUsers || 0}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Analytics;
