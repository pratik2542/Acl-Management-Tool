import Head from "next/head";
// import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";

//********************** connect wallet imports
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, goerli } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Dashboard from "../components/Dashboard";
import { useEffect, useState } from "react";
import SetPermission from "../components/SetPermission";
import AuthorizeFullControl from "../components/AuthorizeFullControl";
import SendStream from "../components/SendStream";
import RevokeFullControl from "../components/RevokeFullControl";
import ViewPermissions from "../components/ViewPermissions";
import ConnectWalletCustom from "../components/ConnectWalletCustom";

//******************************************* */

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  //********************** connect wallet imports

  const { chains, provider } = configureChains(
    [polygon, goerli],
    [
      alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID }),
      publicProvider(),
    ]
  );

  const { connectors } = getDefaultWallets({
    appName: "My RainbowKit App",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  //********************** connect wallet imports

  const [showDashboard, setDashboard] = useState(false);
  const [showSetPermissions, SetSetPermissions] = useState(false);
  const [showAFC, setAFC] = useState(false);
  const [showSendStream, setSendStream] = useState(false);
  const [showRevokeFC, setRevokeFC] = useState(false);
  const [showViewPermissions, setViewPermissions] = useState(false);

  //*********************view permission to revoke page */

  const [operatorAdd, setOperatorAdd] = useState();

  useEffect(() => {
    setDashboard(true);
  }, []);
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          chains={chains}
          theme={lightTheme({
            accentColor: "#10bb35",
            accentColorForeground: "white",
            borderRadius: "medium",
            fontStack: "system",
            overlayBlur: "small",
          })}
        >
          <Head>
            <title>ACL SuperFluid Tool</title>
            <meta
              name="description"
              content="Giving other accounts control over stream operations"
            />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <main className="main">
            {/* ******************** Navbar ******************** */}

            <div className="navbar flex justify-between p-2 items-center absolute w-full px-4 z-10">
              <div className="navbar-logo flex-auto w-64  py-4 px-3">
                {/* //logo of superfluid */}
                <svg
                  width="167px"
                  height="40px"
                  viewBox="0 0 167 40"
                  version="1.1"
                >
                  <title>Logo/Full/Dark</title>
                  <g
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    <g
                      transform="translate(-130.000000, -62.000000)"
                      fill="#000"
                    >
                      <g transform="translate(130.000000, 62.000000)">
                        <g>
                          <path
                            d="M62.415,22.0661111 L62.415,14.4241667 L66.1397222,14.4241667 L66.1397222,22.37 C66.1397222,23.1611111 66.3830556,23.7952778 66.8702778,24.2736111 C67.3577778,24.7516667 67.9786111,24.9911111 68.7327778,24.9911111 C69.4680556,24.9911111 70.0752778,24.7469444 70.5536111,24.2597222 C71.0316667,23.7725 71.2708333,23.1422222 71.2708333,22.37 L71.2708333,14.4241667 L74.9952778,14.4241667 L74.9952778,22.0661111 C74.9952778,23.9422222 74.4019444,25.4691667 73.2158333,26.6458333 C72.0294444,27.8233333 70.5352778,28.4116667 68.7327778,28.4116667 C66.8933333,28.4116667 65.3811111,27.8277778 64.1947222,26.6594444 C63.0080556,25.4916667 62.415,23.9608333 62.415,22.0661111"
                            id="Fill-1"
                          ></path>
                          <path
                            d="M87.3238889,21.2663889 C87.3238889,20.1447222 86.9933333,19.2344444 86.3308333,18.5347222 C85.6691667,17.8366667 84.8225,17.4869444 83.7930556,17.4869444 C82.8,17.4869444 81.9763889,17.8180556 81.3238889,18.48 C80.6705556,19.1422222 80.3444444,20.0616667 80.3444444,21.2388889 C80.3444444,22.4161111 80.6705556,23.3402778 81.3238889,24.0108333 C81.9763889,24.6830556 82.8,25.0183333 83.7930556,25.0183333 C84.8041667,25.0183333 85.6458333,24.6691667 86.3172222,23.9697222 C86.9886111,23.2708333 87.3238889,22.37 87.3238889,21.2663889 Z M89.2136111,16.1488889 C90.4733333,17.5005556 91.1036111,19.1972222 91.1036111,21.2388889 C91.1036111,23.2802778 90.4733333,24.9861111 89.2136111,26.3563889 C87.9541667,27.7263889 86.3769444,28.4116667 84.4825,28.4116667 C82.7719444,28.4116667 81.4108333,27.86 80.3994444,26.7563889 L80.3994444,33.0461111 L76.6752778,33.0461111 L76.6752778,14.4241667 L80.0961111,14.4241667 L80.0961111,16.1352778 C81.0341667,14.7925 82.4961111,14.1211111 84.4825,14.1211111 C86.3769444,14.1211111 87.9541667,14.7966667 89.2136111,16.1488889 L89.2136111,16.1488889 Z"
                            id="Fill-2"
                          ></path>
                          <path
                            d="M96.2052778,19.8866667 L102.412778,19.8866667 C102.394167,19.0591667 102.104167,18.3925 101.543333,17.8866667 C100.981944,17.3811111 100.287778,17.1283333 99.4605556,17.1283333 C98.6697222,17.1283333 97.9797222,17.3763889 97.3913889,17.8730556 C96.8025,18.3691667 96.4072222,19.0411111 96.2052778,19.8866667 Z M105.777778,22.5075 L96.2052778,22.5075 C96.4258333,23.3725 96.8711111,24.0391667 97.5430556,24.5077778 C98.2138889,24.9772222 99.0466667,25.2116667 100.04,25.2116667 C101.381944,25.2116667 102.651111,24.7516667 103.846944,23.8316667 L105.391667,26.3702778 C103.755,27.7313889 101.933889,28.4116667 99.9291667,28.4116667 C97.8325,28.4480556 96.0533333,27.7630556 94.5911111,26.3563889 C93.1288889,24.9488889 92.4161111,23.2525 92.4533333,21.2663889 C92.4161111,19.2983333 93.1055556,17.6063889 94.5222222,16.1902778 C95.9380556,14.7738889 97.63,14.0844444 99.5986111,14.1211111 C101.474722,14.1211111 103.014722,14.7277778 104.219167,15.9419444 C105.423889,17.1558333 106.026389,18.6638889 106.026389,20.4666667 C106.026389,21.1280556 105.943333,21.8094444 105.777778,22.5075 L105.777778,22.5075 Z"
                            id="Fill-3"
                          ></path>
                          <path
                            d="M116.035833,14.4241667 L116.035833,17.7075 L115.0425,17.7075 C113.901944,17.7075 113.005278,18.0111111 112.353056,18.6180556 C111.699444,19.2247222 111.373611,20.1077778 111.373611,21.2663889 L111.373611,28.0805556 L107.649167,28.0805556 L107.649167,14.4241667 L111.070278,14.4241667 L111.070278,16.0519444 C112.026111,14.8569444 113.277222,14.2591667 114.821944,14.2591667 C115.281944,14.2591667 115.686667,14.3141667 116.035833,14.4241667"
                            id="Fill-4"
                          ></path>
                          <path
                            d="M126.5975,28.0805556 L130.321944,28.0805556 L130.321944,7.05833333 L126.5975,7.05833333 L126.5975,28.0805556 Z M124.818889,7.05833333 L124.818889,10.3966667 L123.921944,10.3966667 C123.0575,10.3966667 122.427222,10.5622222 122.032222,10.8933333 C121.636667,11.2238889 121.439167,11.7666667 121.439167,12.5208333 L121.439167,14.4241667 L124.818889,14.4241667 L124.818889,17.5694444 L121.439167,17.5694444 L121.439167,28.0805556 L117.714444,28.0805556 L117.714444,12.19 C117.714444,10.4980556 118.174444,9.22 119.094444,8.355 C120.013333,7.49111111 121.31,7.05833333 122.983889,7.05833333 L124.818889,7.05833333 L124.818889,7.05833333 Z"
                            id="Fill-5"
                          ></path>
                          <path
                            d="M132.136389,22.0661111 L132.136389,14.4241667 L135.861111,14.4241667 L135.861111,22.37 C135.861111,23.1611111 136.104444,23.7952778 136.591944,24.2736111 C137.079167,24.7516667 137.7,24.9911111 138.454444,24.9911111 C139.189722,24.9911111 139.796667,24.7469444 140.274722,24.2597222 C140.753056,23.7725 140.991944,23.1422222 140.991944,22.37 L140.991944,14.4241667 L144.716389,14.4241667 L144.716389,22.0661111 C144.716389,23.9422222 144.123611,25.4691667 142.936944,26.6458333 C141.750833,27.8233333 140.256111,28.4116667 138.454444,28.4116667 C136.614722,28.4116667 135.102222,27.8277778 133.916389,26.6594444 C132.729444,25.4916667 132.136389,23.9608333 132.136389,22.0661111"
                            id="Fill-6"
                          ></path>
                          <polygon
                            id="Fill-7"
                            points="146.531111 28.0805556 150.255556 28.0805556 150.255556 14.4241667 146.531111 14.4241667"
                          ></polygon>
                          <path
                            d="M162.018611,24.0247222 C162.670556,23.3627778 162.997778,22.4436111 162.997778,21.2663889 C162.997778,20.0891667 162.666667,19.165 162.004722,18.4936111 C161.342222,17.8222222 160.523889,17.4869444 159.549444,17.4869444 C158.537222,17.4869444 157.696111,17.8366667 157.024722,18.5347222 C156.353333,19.2344444 156.018056,20.1352778 156.018056,21.2388889 C156.018056,22.3611111 156.349167,23.2708333 157.011111,23.9697222 C157.673333,24.6691667 158.518889,25.0183333 159.549444,25.0183333 C160.5425,25.0183333 161.365,24.6872222 162.018611,24.0247222 Z M162.942778,7.05833333 L166.666667,7.05833333 L166.666667,28.0805556 L163.246111,28.0805556 L163.246111,26.3975 C162.308056,27.7402778 160.845556,28.4116667 158.859722,28.4116667 C156.946389,28.4116667 155.364722,27.7355556 154.114722,26.3838889 C152.863333,25.0322222 152.238611,23.3263889 152.238611,21.2663889 C152.238611,19.2066667 152.863333,17.5005556 154.114722,16.1488889 C155.364722,14.7966667 156.946389,14.1211111 158.859722,14.1211111 C160.587778,14.1211111 161.949167,14.6638889 162.942778,15.7488889 L162.942778,7.05833333 L162.942778,7.05833333 Z"
                            id="Fill-8"
                          ></path>
                          <path
                            d="M56.5891667,17.6244444 L54.52,16.7144444 C53.7105556,16.3469444 53.1544444,16.0202778 52.8511111,15.7344444 C52.5477778,15.45 52.3958333,15.0775 52.3958333,14.6177778 C52.3958333,14.5494444 52.4088889,14.4888889 52.4155556,14.4241667 L48.6294444,14.4241667 C48.6252778,14.5163889 48.6163889,14.6061111 48.6163889,14.7002778 C48.6163889,16.8891667 50.0875,18.6363889 53.0305556,19.9422222 L54.9888889,20.8247222 C55.9086111,21.2483333 56.5244444,21.6022222 56.8375,21.8869444 C57.1502778,22.1719444 57.3066667,22.5727778 57.3066667,23.0866667 C57.3066667,23.7127778 57.0763889,24.2041667 56.6169444,24.5630556 C56.1569444,24.9216667 55.5222222,25.1008333 54.7133333,25.1008333 C53.0208333,25.1008333 51.5311111,24.2177778 50.2438889,22.4525 L47.6783333,24.3833333 C48.3955556,25.6347222 49.3655556,26.6180556 50.5888889,27.3355556 C51.8116667,28.0530556 53.1866667,28.4116667 54.7133333,28.4116667 C56.5705556,28.4116667 58.0972222,27.9105556 59.2927778,26.9080556 C60.4880556,25.9055556 61.0861111,24.5861111 61.0861111,22.9491667 C61.0861111,21.735 60.7272222,20.7194444 60.0102778,19.9008333 C59.2927778,19.0825 58.1522222,18.3238889 56.5891667,17.6244444"
                            id="Fill-9"
                          ></path>
                          <polyline
                            id="Fill-10"
                            points="61.0861111 9.00555556 55.6675 9.00555556 55.6675 11.715 58.3769444 11.715 58.3769444 14.4241667 61.0861111 14.4241667 61.0861111 9.00555556"
                          ></polyline>
                          <polygon
                            id="Fill-11"
                            points="150.255556 14.4241667 154.361111 14.4241667 154.361111 10.3183333 150.255556 10.3183333"
                          ></polygon>
                          <path
                            d="M30.6977778,23.5061111 L23.4586111,23.5061111 L23.4586111,16.2669444 L16.2191667,16.2669444 L16.2191667,9.0275 L30.6977778,9.0275 L30.6977778,23.5061111 Z M8.98,30.7452778 L16.2191667,30.7452778 L16.2191667,23.5061111 L8.98,23.5061111 L8.98,30.7452778 Z M0,4.38416667 L0,35.3891667 C0,37.7838889 1.94138889,39.7255556 4.33638889,39.7255556 L35.3413889,39.7255556 C37.7363889,39.7255556 39.6777778,37.7838889 39.6777778,35.3891667 L39.6777778,4.38416667 C39.6777778,1.98916667 37.7363889,0.0477777778 35.3413889,0.0477777778 L4.33638889,0.0477777778 C1.94138889,0.0477777778 0,1.98916667 0,4.38416667 L0,4.38416667 Z"
                            id="Fill-12"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <div className="connect-wallet">
                <ConnectButton
                  accountStatus={{
                    smallScreen: "avatar",
                    largeScreen: "full",
                  }}
                  showBalance={{
                    smallScreen: false,
                    largeScreen: true,
                  }}
                />
              </div>
            </div>

            {/* ******************** main ******************** */}

            <div className="flex  min-h-screen">
              {/* ****************main left panel************** */}
              <div className="min-h-screen w-[300px] border-r-[1px] py-2 px-4 bg-white pt-[100px]">
                <ConnectWalletCustom />
                <ul className="flex flex-col list-none cursor-pointer py-4 gap-[10px]">
                  <div
                    className={
                      showDashboard
                        ? `${styles.left_ul_link} ${styles.active}`
                        : `${styles.left_ul_link}`
                    }
                    onClick={() => {
                      setDashboard(true);
                      SetSetPermissions(false);
                      setAFC(false);
                      setSendStream(false);
                      setRevokeFC(false);
                      setViewPermissions(false);
                    }}
                  >
                    <div className={styles.link_icon}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        enable-background="new 0 0 24 24"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                        fill="#000000"
                      >
                        <rect fill="none" height="24" width="24" />
                        <path d="M9,21H5c-1.1,0-2-0.9-2-2V5c0-1.1,0.9-2,2-2h4c1.1,0,2,0.9,2,2v14C11,20.1,10.1,21,9,21z M15,21h4c1.1,0,2-0.9,2-2v-5 c0-1.1-0.9-2-2-2h-4c-1.1,0-2,0.9-2,2v5C13,20.1,13.9,21,15,21z M21,8V5c0-1.1-0.9-2-2-2h-4c-1.1,0-2,0.9-2,2v3c0,1.1,0.9,2,2,2h4 C20.1,10,21,9.1,21,8z" />
                      </svg>
                    </div>
                    <div className={styles.link_text}>Dashboard</div>
                  </div>
                  <div
                    className={
                      showSetPermissions
                        ? `${styles.left_ul_link} ${styles.active}`
                        : `${styles.left_ul_link}`
                    }
                    onClick={() => {
                      setDashboard(false);
                      SetSetPermissions(true);
                      setAFC(false);
                      setSendStream(false);
                      setRevokeFC(false);
                      setViewPermissions(false);
                    }}
                  >
                    <div className={styles.link_icon}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        enable-background="new 0 0 24 24"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                        fill="#000000"
                      >
                        <g>
                          <path d="M0,0h24v24H0V0z" fill="none" />
                        </g>
                        <g>
                          <g>
                            <path d="M10.67,13.02C10.45,13.01,10.23,13,10,13c-2.42,0-4.68,0.67-6.61,1.82C2.51,15.34,2,16.32,2,17.35V19c0,0.55,0.45,1,1,1 h8.26C10.47,18.87,10,17.49,10,16C10,14.93,10.25,13.93,10.67,13.02z" />
                            <circle cx="10" cy="8" r="4" />
                            <path d="M20.75,16c0-0.22-0.03-0.42-0.06-0.63l0.84-0.73c0.18-0.16,0.22-0.42,0.1-0.63l-0.59-1.02c-0.12-0.21-0.37-0.3-0.59-0.22 l-1.06,0.36c-0.32-0.27-0.68-0.48-1.08-0.63l-0.22-1.09c-0.05-0.23-0.25-0.4-0.49-0.4h-1.18c-0.24,0-0.44,0.17-0.49,0.4 l-0.22,1.09c-0.4,0.15-0.76,0.36-1.08,0.63l-1.06-0.36c-0.23-0.08-0.47,0.02-0.59,0.22l-0.59,1.02c-0.12,0.21-0.08,0.47,0.1,0.63 l0.84,0.73c-0.03,0.21-0.06,0.41-0.06,0.63s0.03,0.42,0.06,0.63l-0.84,0.73c-0.18,0.16-0.22,0.42-0.1,0.63l0.59,1.02 c0.12,0.21,0.37,0.3,0.59,0.22l1.06-0.36c0.32,0.27,0.68,0.48,1.08,0.63l0.22,1.09c0.05,0.23,0.25,0.4,0.49,0.4h1.18 c0.24,0,0.44-0.17,0.49-0.4l0.22-1.09c0.4-0.15,0.76-0.36,1.08-0.63l1.06,0.36c0.23,0.08,0.47-0.02,0.59-0.22l0.59-1.02 c0.12-0.21,0.08-0.47-0.1-0.63l-0.84-0.73C20.72,16.42,20.75,16.22,20.75,16z M17,18c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2 S18.1,18,17,18z" />
                          </g>
                        </g>
                      </svg>
                    </div>
                    <div className={styles.link_text}>Set Permissions</div>
                  </div>
                  <div
                    className={
                      showAFC
                        ? `${styles.left_ul_link} ${styles.active}`
                        : `${styles.left_ul_link}`
                    }
                    onClick={() => {
                      setDashboard(false);
                      SetSetPermissions(false);
                      setAFC(true);
                      setSendStream(false);
                      setRevokeFC(false);
                      setViewPermissions(false);
                    }}
                  >
                    <div className={styles.link_icon}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                        fill="#000000"
                      >
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path d="M2 21h10c.55 0 1 .45 1 1s-.45 1-1 1H2c-.55 0-1-.45-1-1s.45-1 1-1zM5.24 8.07l2.83-2.83L20.8 17.97c.78.78.78 2.05 0 2.83-.78.78-2.05.78-2.83 0L5.24 8.07zm8.49-5.66l2.83 2.83c.78.78.78 2.05 0 2.83l-1.42 1.42-5.65-5.66 1.41-1.41c.78-.79 2.05-.79 2.83-.01zm-9.9 7.07l5.66 5.66-1.41 1.41c-.78.78-2.05.78-2.83 0l-2.83-2.83c-.78-.78-.78-2.05 0-2.83l1.41-1.41z" />
                      </svg>
                    </div>
                    <div className={styles.link_text}>
                      Athorize Full Control
                    </div>
                  </div>
                  <div
                    className={
                      showSendStream
                        ? `${styles.left_ul_link} ${styles.active}`
                        : `${styles.left_ul_link}`
                    }
                    onClick={() => {
                      setDashboard(false);
                      SetSetPermissions(false);
                      setAFC(false);
                      setSendStream(true);
                      setRevokeFC(false);
                      setViewPermissions(false);
                    }}
                  >
                    <div className={styles.link_icon}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                        fill="#000000"
                      >
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z" />
                      </svg>
                    </div>
                    <div className={styles.link_text}>Send Stream</div>
                  </div>
                  <div
                    className={
                      showRevokeFC
                        ? `${styles.left_ul_link} ${styles.active}`
                        : `${styles.left_ul_link}`
                    }
                    onClick={() => {
                      setDashboard(false);
                      SetSetPermissions(false);
                      setAFC(false);
                      setSendStream(false);
                      setRevokeFC(true);
                      setViewPermissions(false);
                    }}
                  >
                    <div className={styles.link_icon}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        enable-background="new 0 0 24 24"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                        fill="#000000"
                      >
                        <g>
                          <path d="M0,0h24v24H0V0z" fill="none" />
                        </g>
                        <g>
                          <path d="M18.7,4.51l-6-2.25c-0.45-0.17-0.95-0.17-1.4,0l-6,2.25C4.52,4.81,4,5.55,4,6.39v4.7c0,4.94,3.27,9.57,7.71,10.83 c0.19,0.05,0.39,0.05,0.57,0C16.73,20.66,20,16.03,20,11.09v-4.7C20,5.55,19.48,4.81,18.7,4.51z M14.8,14.79L14.8,14.79 c-0.39,0.39-1.02,0.39-1.41,0.01L12,13.42l-1.39,1.38c-0.39,0.39-1.02,0.39-1.41,0l0,0c-0.39-0.39-0.39-1.02,0-1.41L10.59,12 L9.2,10.61c-0.39-0.39-0.39-1.02,0-1.41c0.39-0.39,1.02-0.39,1.41,0L12,10.59l1.39-1.39c0.39-0.39,1.02-0.39,1.41,0l0,0 c0.39,0.39,0.39,1.02,0,1.41L13.42,12l1.38,1.38C15.19,13.77,15.19,14.4,14.8,14.79z" />
                        </g>
                      </svg>
                    </div>
                    <div className={styles.link_text}>Revoke Full Control</div>
                  </div>
                  <div
                    className={
                      showViewPermissions
                        ? `${styles.left_ul_link} ${styles.active}`
                        : `${styles.left_ul_link}`
                    }
                    onClick={() => {
                      setDashboard(false);
                      SetSetPermissions(false);
                      setAFC(false);
                      setSendStream(false);
                      setRevokeFC(false);
                      setViewPermissions(true);
                    }}
                  >
                    <div className={styles.link_icon}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        enable-background="new 0 0 24 24"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                        fill="#000000"
                      >
                        <rect fill="none" height="24" width="24" />
                        <path d="M4,14h2c0.55,0,1-0.45,1-1v-2c0-0.55-0.45-1-1-1H4c-0.55,0-1,0.45-1,1v2C3,13.55,3.45,14,4,14z M4,19h2c0.55,0,1-0.45,1-1 v-2c0-0.55-0.45-1-1-1H4c-0.55,0-1,0.45-1,1v2C3,18.55,3.45,19,4,19z M4,9h2c0.55,0,1-0.45,1-1V6c0-0.55-0.45-1-1-1H4 C3.45,5,3,5.45,3,6v2C3,8.55,3.45,9,4,9z M9,14h11c0.55,0,1-0.45,1-1v-2c0-0.55-0.45-1-1-1H9c-0.55,0-1,0.45-1,1v2 C8,13.55,8.45,14,9,14z M9,19h11c0.55,0,1-0.45,1-1v-2c0-0.55-0.45-1-1-1H9c-0.55,0-1,0.45-1,1v2C8,18.55,8.45,19,9,19z M8,6v2 c0,0.55,0.45,1,1,1h11c0.55,0,1-0.45,1-1V6c0-0.55-0.45-1-1-1H9C8.45,5,8,5.45,8,6z" />
                      </svg>
                    </div>
                    <div className={styles.link_text}>View Permissions</div>
                  </div>
                </ul>
              </div>
              {/* ****************main right panel************** */}
              <div className="w-full">
                <div className="inside-main-right">
                  {showDashboard ? (
                    <Dashboard />
                  ) : showSetPermissions ? (
                    <SetPermission />
                  ) : showAFC ? (
                    <AuthorizeFullControl />
                  ) : showSendStream ? (
                    <SendStream />
                  ) : showRevokeFC ? (
                    <RevokeFullControl operatorAdd={operatorAdd} />
                  ) : showViewPermissions ? (
                    <ViewPermissions
                      setViewPermissions={setViewPermissions}
                      setRevokeFC={setRevokeFC}
                      setOperatorAdd={setOperatorAdd}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </main>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}
