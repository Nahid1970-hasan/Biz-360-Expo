import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { loadPage } from "../features/page/page_slice";
import styled from "styled-components";
import { CardBody } from "../component/style/styled_card";
import { Flex } from "../component/style/styled_flex";
import { Label } from "../component/style/styled_label";
import { Select } from "../component/style/styled_select";
import { Input } from "../component/style/styled_input";
import { PrimaryButton } from "../component/style/styled_button";
import { loadFeedbackData, initLoader } from "../features/feedback/feedback_Slice";
import { Toast } from "../component/Toast";
import { FeedbackGrid } from "../features/feedback/FeedbackGrid";


const CustDiv = styled.div` 
  display: flex;
  padding-top:0px; 
  & button:first-child{
    margin-right:5px;
  }
  & button:last-child{
    margin-left:4px;
  }
`;
export const FeedbackPage = () => {
    const feedback = useSelector((state) => state.feedback);
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [lang, set_lang] = useState("en");
    const dropDownInputRef = useRef(null);
    const dropDownRef = useRef(null);
    const [full, setFull] = useState(false);
    const [get_value, set_value] = useState("req_name");

    useEffect(() => {
        dispatch(
            loadPage({
                title: ("feedback"),
                button: false,
                onClick: () => {
                    setOpen(true);
                },
                buttonText: "add_new",
            })
        );
        let initialData = {
            search_col: 'request_name',
            search_str: ''
        }; 
        dispatch(loadFeedbackData(initialData));
    }, []);

    // useEffect(() => {
    //     feedback.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    // }, [feedback.loading]);


    useEffect(() => {
        if (feedback.addUpdateLoading == "pending") {
            setIsLoading(true)
        } else if (feedback.addUpdateLoading == "succeeded") {
            setIsLoading(false);
            dispatch(loadFeedbackData());
            setTimeout(() => { dispatch(initLoader()); }, 4000);
        } else {
            setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 4000);
        }
    }, [feedback.addUpdateLoading]);



    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        let data = {
            search_col: dropDownRef.current.value,
            search_str: dropDownInputRef.current.value
        };
        dispatch(loadFeedbackData(data));
    };

    const handleChangeOption = (values) => {
        let searchID = dropDownRef.current.value;
        set_value(searchID);
    };

    const searchType = [
        //{ key: "", value: "" },
        { key: "req_name", value: t("req_name") },
        { key: "req_mobile", value: t("mobile") },
        { key: "req_address", value: t("address") },
        { key: "req_email", value: t("email") },
        { key: "res_detail", value: t("detail") },
    ]

       const rowData = feedback?.list.map((d, i) => ({
            ...d,
            "sl": i + 1,
            // question: getValueByLang(d.question || "{}", lang),
        }));

    return feedback.loading === "unauthorized" ? (
        <UnAuthorized />
    ) : (
        <>
            {(feedback.addUpdateLoading == "idle" || feedback.addUpdateLoading == "pending") ? <></> : (
                feedback.addUpdateLoading == "succeeded" ? (
                    <Toast msg={feedback.msg} icon="task_alt" color="success" />
                ) : (
                    <Toast color="error" msg={feedback.msg} />
                )
            )}
            <CardBody>
                <form>
                    <Flex row="row">
                        <Flex md={4} padding="0!important">
                            <Flex row="row">
                                <Flex md={5} sm={6} xs={12} padding="0 !important">
                                    <Label > {t("serch_type")}</Label>
                                    <Select
                                        app="true"
                                        ref={dropDownRef}
                                        name="search_col"
                                        onChange={handleChangeOption}>
                                        <option disabled> {t("ph_select_val")}</option>
                                        {
                                            searchType?.map((d, i) => (<option key={i} value={d.key}>{i18n.resolvedLanguage == "bn" ? d.value_bn : d.value}</option>))
                                        }
                                    </Select>

                                </Flex>
                                <Flex md={5} sm={6} xs={12} padding="0 !important">
                                    <Label > {t("serch_val")} </Label>

                                    {
                                        (get_value === 'req_name' ||
                                            get_value === 'req_address' ||
                                            get_value === 'req_mobile' ||
                                            get_value === 'req_email' ||
                                            get_value === 'res_detail') &&
                                        <Input
                                            app="true"
                                            ref={dropDownInputRef}
                                            type="text"
                                            name="search_str"
                                            disabled={get_value == 'all'}
                                            placeholder={t("ph_search_val")}
                                        />
                                    }
                                </Flex>
                                <Flex padding="28px 0 0 0" md={2} sm={12} xs={12}>
                                    <PrimaryButton

                                        margin="18px"
                                        type="submit"
                                        onClick={handleSubmit}
                                    >
                                        {t("submit")}
                                    </PrimaryButton>

                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                </form>
               <Flex row="row">
                           <Flex padding="0 !important" md={12} sm={12} xs={12}>
                               <FeedbackGrid gridata={rowData} />
                           </Flex>
                       </Flex>
            </CardBody>

        </>
    );
};
