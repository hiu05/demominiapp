import React, { useState, useEffect } from "react";
import appboxoSdk from "@appboxo/js-sdk";
import { Card, Button, Typography } from "antd";
const { Text } = Typography;

const PullToRefresh = () => {
  const [refreshStatus, setRefreshStatus] = useState("idle");
  const [lastRefreshTime, setLastRefreshTime] = useState(null);

  const pullToRefreshListener = (event) => {
    if (!event.detail) {
      return;
    }

    const { type } = event.detail;

    if (type === "AppBoxoWebAppStartPullToRefresh") {
      setRefreshStatus("refreshing");

      // Simulate refresh action
      setTimeout(() => {
        setRefreshStatus("completed");
        setLastRefreshTime(new Date().toLocaleTimeString());
        // Notify the container that refresh is complete
        appboxoSdk.send("AppBoxoWebAppStopPullToRefresh");
      }, 1500);
    }
  };

  useEffect(() => {
    appboxoSdk.subscribe(pullToRefreshListener);

    return () => {
      appboxoSdk.unsubscribe(pullToRefreshListener);
    };
  }, []);

  const enablePullToRefresh = () => {
    appboxoSdk.send("AppBoxoWebAppSetPullToRefresh", {
      enabled: true,
    });
    setRefreshStatus("enabled");
  };

  const disablePullToRefresh = () => {
    appboxoSdk.send("AppBoxoWebAppSetPullToRefresh", {
      enabled: false,
    });
    setRefreshStatus("disabled");
  };

  return (
    <Card title="Pull To Refresh">
      <Button
        size="large"
        block
        onClick={enablePullToRefresh}
        style={{ marginBottom: 10 }}
      >
        Enable Pull To Refresh
      </Button>
      <Button
        size="large"
        block
        onClick={disablePullToRefresh}
        style={{ marginBottom: 10 }}
      >
        Disable Pull To Refresh
      </Button>
      <Text type="secondary">Status: </Text>
      <Text type="warning">{refreshStatus}</Text>
      {lastRefreshTime && (
        <div style={{ marginTop: 10 }}>
          <Text type="secondary">Last refreshed at: </Text>
          <Text type="warning">{lastRefreshTime}</Text>
        </div>
      )}
    </Card>
  );
};

export default PullToRefresh;
