import { Suspense } from "react"
import { Modal } from "../../component/Modal";
import { CardHeaderButton, InfoCard } from "../../component/style/styled_card";
import { Typography, ULine } from "../../component/style/styled_typography";
import { PrimaryButton } from "../../component/style/styled_button";
import { useTranslation } from "react-i18next";
import { Flex } from "../../component/style/styled_flex";
import { Checkbox, CheckboxLabel } from "../../component/Checkbox";

export const SetuptempNavModal = ({ open, setOpen = () => { }, data }) => {
    const { t, i18n } = useTranslation();
    return (<>
        <Modal
            md={4}
            sm={8}
            xs={12}
            title={t("update_navbar")}
            open={open}
            onClose={() => {
                setOpen(false);
            }}
            outsideclick
        >
            <div>
                <Flex row="row" justifycenter="true" >
                    <Flex md={12}  padding="0 !important">
                        <InfoCard>
                            <Typography txtalign="left">
                                {t("language_setup")}
                            </Typography>
                            <ULine />
                        </InfoCard>
                    </Flex>
                    <Flex md={12} padding="0 !important">
                        {
                            data?.map((d,i)=>
                            <CheckboxLabel key={i} checked={d.selected||0} onClick={() => { }} label={d.language_name} labelcolor="font" size={"md"} /> 
                        )
                        } 
                    </Flex>
                    <Flex md={12}>
                        <CardHeaderButton>
                            <PrimaryButton
                                type="button"
                            >
                                {t("submit")}
                            </PrimaryButton>
                        </CardHeaderButton>
                    </Flex>
                </Flex>
            </div>
        </Modal>
    </>)
}