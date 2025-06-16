import { Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Flatpickr from "react-flatpickr";
import { DateTime } from "luxon"; import { loadPage } from "../features/page/page_slice";
import { Flex } from "../component/style/styled_flex";
import { Card, CardBody } from "../component/style/styled_card";
import { Typography } from "../component/style/styled_typography";
import { PrimaryButton } from "../component/style/styled_button";
import styled from "styled-components";
import { Loader } from "../component/style/Loader_styled";
import { Input } from "../component/style/styled_input";
import { loadAuditLogData } from "../features/auditLog/audit_log_slice";
import { Loading } from "../component/Loading";
import { Modal } from "../component/Modal";
import JSONPretty from "react-json-pretty";
import JSONPrettyMon from 'react-json-pretty/dist/monikai';
import DataGrid from "../component/DataGrid";

const CustDiv = styled.div`
  display: flex;
  margin: 0 0 0 0;
  align-items: center;
  & input {
    height: 35px;
    width: auto;
    margin: 0;
  }
  & :first-child {
    margin-right: 8px;
  }
  & :last-child {
    margin-left: 8px;
  }
`;

export const AdminAuditLogPage = () => {
   
    const auditLogsData = useSelector((state) => state.auditlogdata);
    const userReadOnly = useSelector((state) => state.user.read_only);
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const [date, setDate] = useState("");
    const [viewOpen, setViewOpen] = useState(false);
    const [rows, set_rows] = useState([]);
    const [viewData, setViewData] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        dispatch(loadPage({ title: t("audit_log"), button: false }));
        var today = DateTime.now().toFormat("yyyy-MM-dd");
        setDate(today);
        loadAuditLogData(today);
    }, []);

    const auditLogsColums = [
        {
            headerName: "Id",
            field: "audit_id",
            key: true,
            type: "number",
            hide: true,
        },
        {
            headerName: "serial",
            field: "serial",
            type: "string",
            fontFamily: "var(--dashboard-font)",
            description: "serial_no",
            sortable: true,
            smhide: true,
            width: "50px",
        },
        {
            headerName: "source",
            field: "request_source",
            fontFamily: "var(--dashboard-font)",
            description: "req_src",
            type: "string",
            width: "110px"
        },
        {
            headerName: "type",
            description: "request_type",
            field: "request_type",
            type: "string",
            fontFamily: "var(--dashboard-font)",
            width: "100px",
        },

        {
            headerName: "req_desc",
            description: "req_desc",
            field: "request_desc",
            type: "string",
            fontFamily: "var(--dashboard-font)",
           
        },
        {
            headerName: "ip_address",
            description: "ip_address",
            field: "ip_address",
            type: "string",
            fontFamily: "var(--dashboard-font)",
            width: "150px"
        },
        {
            headerName: "time",
            field: "timestamp",
            description: "time",
            type: "timestamp",
            fontFamily: "var(--dashboard-font)",
            width: "200px"
        },
        {
            headerName: "action",
            field: "",
            hide: userReadOnly,
            type: "action",
            icons: ["preview"],
            colors: ["info"],
            descriptions: ["View Details"],
            callBacks: [
                (id) => {
                    var data = auditLogsData?.dataList.find((d) => d.audit_id == id);
                    setViewData(data);
                    setViewOpen(data ?? true);
                },
            ],
        },
    ];

      function loadAuditData(date) {
        setIsLoading(true);
        var data = {
          date: date,
        };
        dispatch(loadAuditLogData(data));
      }

      function handleSubmit() {
        loadAuditData(date);
      }
      useEffect(() => {
        auditLogsData.loading != "pending" &&  setTimeout(() =>  setIsLoading(false), 2000);
      }, [auditLogsData.loading]);

      useEffect(() => {
        let rwData = auditLogsData?.dataList?.map((d, i) => ({ ...d, "serial": i + 1 }))
         set_rows(rwData);
    }, [auditLogsData?.dataList]);

    return (
        <>
            <Flex row="row">
                <Flex padding={"0 0 0 0 !important"} md={12}>
                    <Suspense fallback={<Loader />}>
                        <CardBody>
                            <form>
                                <Flex row="row">
                                    <Flex padding="0 !important" md={4} sm={12} xs={12}>
                                        <CustDiv>
                                            <Typography
                                                txtalign="left"
                                            >
                                                {t("date")}
                                            </Typography>
                                            <Flatpickr
                                                readOnly
                                                options={{
                                                    dateFormat: "Y-m-d",
                                                }}
                                                value={date || ""}
                                                onChange={(e, str) => {
                                                    setDate(str);
                                                }}
                                                render={({ value, ...props }, ref) => {
                                                    return (
                                                        <Input
                                                            {...props}
                                                            type="text"
                                                            name="date"
                                                            mnwidth="auto"
                                                            placeholder={t("pick_date")}
                                                            value={date || ""}
                                                            ref={ref}
                                                        />
                                                    );
                                                }}
                                            />
                                            <PrimaryButton
                                                margin="7px"
                                                type="button"
                                                onClick={() => handleSubmit()}
                                            >
                                                {t("submit")}
                                            </PrimaryButton>
                                        </CustDiv>
                                    </Flex>
                                </Flex>
                            </form>
                        </CardBody>
                        <CardBody>
                            <Flex row="row">
                                <Flex padding={"0 0 0 !important"} md={12}>
                                    {auditLogsData.loading == "succeeded" ? (
                                        <DataGrid
                                            colums={auditLogsColums}
                                            rows={rows || []}
                                        />
                                    ) : (
                                        <></>
                                    )}

                                </Flex>
                            </Flex>

                        </CardBody>
                    </Suspense>
                </Flex>
            </Flex>

            <Modal
          title={t("audit_detail")}
          open={viewOpen}
          md={6}
          sm={8}
          xs={11}
          onClose={() => {
            setViewOpen(false);
          }}
          outsideclick
        >
        <div style={{padding:'10px 5px'}}>
          <Flex row="row">
              <Flex padding="0 0 0px 0 !important"md={12}>
                  <Card>
                    <JSONPretty style={{ height: "auto", maxHeight: '450px', background: '#272822', padding:"10px" }} id="json-pretty" data={viewData?.detail ?? {}} theme={JSONPrettyMon}></JSONPretty>
                  </Card>
              </Flex>
          </Flex>
          </div>
        </Modal>
            <Loading open={isLoading}/>
        </>
    );
};
