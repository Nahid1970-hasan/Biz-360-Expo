import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPage } from "../features/page/page_slice";
import UnAuthorized from "./UnAuthorized";
import { Toast } from "../component/Toast";
import { Loader } from "../component/style/Loader_styled";
import { Flex } from "../component/style/styled_flex";
import { CardBody } from "../component/style/styled_card";
import DataGrid from "../component/DataGrid";
import { initLoader, loadFaqGroupData } from "../features/faq/faq_Slice";
import { Loading } from "../component/Loading";
import { InlineFlex } from "../component/style/styled_inlineflex";
import { Select } from "../component/style/styled_select";
import { getValueByLang } from "../utils/helper";
import { useTranslation } from "react-i18next";
import { FaqGroupModal } from "../features/faq/FaqGroupModal";
import { FaqGroupDelete } from "../features/faq/FaqGroupDelete";


export const FAQGroupPage = () => {
    const dispatch = useDispatch();
    const faqData = useSelector((state) => state.faqData);
    const [remove, setRemove] = useState(false);
    const [data, setData] = useState({});
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [rows, set_rows] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [lang, set_lang] = useState("en");
    const { t, i18n } = useTranslation();
    const [group_id, set_group_id] = useState(0);
    const [group_name, set_group_name] = useState("");


    const colums = [
        {
            headerName: "Id",
            field: "group_id",
            key: true,
            type: "number",
            hide: true,
        },
        {
            headerName: ("#"),
            field: "sl",
            description: "Serial",
            sortable: true,
            width: "50px",
            fontFamily: "var(--dashboard-font)",
            type: "number",
        },
        {
            headerName: "faq_type",
            field: "group_name_value",
            fontFamily: "var(--dashboard-font)",
            description: "faq_type",
            sortable: true,
            filterable: true,
            type: "string",
        },
        {
            headerName: "action",
            field: "",
            type: "action",
            icons: ["edit", "delete"],
            colors: ["success", "error"],
            descriptions: ["Edit FAQ", "Delete FAQ"],
            callBacks: [
                (group_id) => {
                    var rowdata = faqData?.groupList?.find((d) => d.group_id == group_id);
                    setEditOpen(true);
                    setData(rowdata);

                },
                (group_id) => {
                    var data = faqData?.groupList?.find((d) => d.group_id == group_id);
                    setRemove(true);
                    set_group_id(group_id);
                },
            ],
        },
    ];

    useEffect(() => {
        setIsLoading(true);
        dispatch(loadFaqGroupData());
        dispatch(
            loadPage({
                title: "faq_type",
                button: true,
                onClick: () => {
                    setOpen(true);
                },
                buttonText: "add_new",
            })
        );
    }, []);


    useEffect(() => {
        faqData.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [faqData.loading]);


    useEffect(() => {
        if (faqData.addUpdateLoading == "pending") {
            setIsLoading(true)
        } else if (faqData.addUpdateLoading == "succeeded") {
            setIsLoading(false);
            dispatch(loadFaqGroupData());
            setTimeout(() => { dispatch(initLoader()); }, 4000);
        } else {
            setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 4000);
        }
    }, [faqData.addUpdateLoading]);



    const rowData = faqData?.groupList?.map((d, i) => ({
        ...d,
        "sl": i + 1,
        group_name_value: getValueByLang(d.group_name || "{}", lang),

    }));


    return faqData.loading === "unauthorized" ? (
        <UnAuthorized />
    ) : (
        <>
            {(faqData.addUpdateLoading == "idle" || faqData.addUpdateLoading == "pending") ? <></> : (
                faqData.addUpdateLoading == "succeeded" ? (
                    <Toast msg={faqData.msg} icon="task_alt" color="success" />
                ) : (
                    <Toast color="error" msg={faqData.msg} />
                )
            )}
            <Suspense fallback={<Loader />}>

                {/* <Flex row="row">
                        <Flex padding="0 10px 0 0 !important" md={8} sm={12}>
                          <Flex row="row">
                            <Flex padding="0 !important" md={6} sm={12} xs={12}>
                              <InlineFlex justifycontent="start">
                                <Select
                                  app="true"
                                  width="220px"
                                  name="group_id"
                                  onChange={(e) => {
                                    const grp = faqData?.groupList?.find((d) => d.group_id == e.target.value);
                                    set_group_name(grp.group_name);
                                    set_group_id(e.target.value);
                                  }}
                                  color={!group_id ? "error" : null}
                                  value={group_id || 0}
                                >
                                  <option disabled value={0}>
                                    {t("ph_select")}
                                  </option>
                                  {faqData?.groupList?.map((d, i) => (
                                    <option key={i} value={d.group_id}>
                                      {getValueByLang(d.group_name || "{}", lang)}
                                    </option>
                                  ))}
                                </Select>
                                <PrimaryButton type="button" onClick={loadGroupData} disabled={!group_id}>
                                  {t("search")}
                                </PrimaryButton>
                              </InlineFlex>
                            </Flex>
                            <Flex padding="0 !important" md={6} sm={12} xs={12}>
                            <InlineFlex justifycontent="end">
                            <Select
                                app="true"
                                name="lang"
                                onChange={(e) => { set_lang(e.target.value) }}
                                value={lang || "en"}
                            >

                                <option disabled value={0}>
                                    {t("ph_select")}
                                </option>
                                {
                                    faqData?.langList?.map((d, i) => <option key={i} value={d.language_code}>{d.language_name}</option>)
                                }
                            </Select>
                        </InlineFlex>
                            </Flex>
                          </Flex>
                        </Flex>
                      </Flex> */}
                <Flex row="row">
                    <Flex padding="0 10px !important" md={12} sm={12} xs={12}>
                        <InlineFlex justifycontent="end">
                            <Select
                                app="true"
                                name="lang"
                                onChange={(e) => { set_lang(e.target.value) }}
                                value={lang || "en"}
                            >

                                <option disabled value={0}>
                                    {t("ph_select")}
                                </option>
                                {
                                    faqData?.groupLang?.map((d, i) => <option key={i} value={d.language_code}>{d.language_name}</option>)
                                }
                            </Select>
                        </InlineFlex>

                    </Flex>
                </Flex>
                <Flex row="row">
                    <Flex padding="0 !important" md={12} sm={12} xs={12}>
                        <CardBody>
                            <DataGrid
                                colums={colums}
                                rows={rowData || []}
                            />
                        </CardBody>
                        <FaqGroupDelete open={remove} setOpen={setRemove} data={{ group_id }} />
                        <FaqGroupModal open={open} setOpen={setOpen} add />
                        <FaqGroupModal open={editOpen} setOpen={setEditOpen} data={data} />
                    </Flex>
                </Flex>

            </Suspense>
            <Loading open={isLoading} />
        </>
    );
};

