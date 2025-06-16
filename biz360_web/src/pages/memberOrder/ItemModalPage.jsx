
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../component/Modal";
import { useTranslation } from "react-i18next";
import { Flex } from "../../component/style/styled_flex";
import { CardBody } from "../../component/style/styled_card";
import DataGrid from "../../component/DataGrid";
import { Typography } from "../../component/style/styled_typography";

export const ItemModalPage = ({
    add,
    open,
    setOpen = () => { },
    data,
}) => {
    const mOrderData = useSelector((state) => state.memberorderdata);
    const { t, i18n } = useTranslation();
    const colums = [
        {
            headerName: "Id",
            field: "order_id",
            key: true,
            type: "number",
            hide: true,
        },
        {
            headerName: ("#"),
            field: "sl",
            description: "Serial",
            sortable: true,
            width: "40px",
            fontFamily: "var(--dashboard-font)",
            type: "number",
        },
        {
            headerName: "item_name",
            field: "item_name",
            description: "item_name",
            type: "string",
            width: "180px"
        },
        {
            headerName: "description",
            field: "item_description",
            description: "item_description",
            type: "string",
        },

        {
            headerName: "item_unit_price",
            field: "item_unit_price",
            description: "item_unit_price",
            type: "string",
            width: "150px"
        },
        {
            headerName: "quantity",
            field: "item_qty",
            description: "item_qty",
            type: "string",
            width: "120px"
        },
        {
            headerName: "total_price",
            field: "item_total_price",
            description: "item_total_price",
            type: "string",
            width: "150px"
        },


    ];

    const Data = data?.items?.map((d, i) => ({
        ...d,
        "sl": i + 1,
        "q_unit": d.item_qty+""+d.unit_name
    }));

    return (<>
        <Modal
            md={8}
            sm={12}
            xs={12}
            title={t("order_item")}
            open={open}
            onClose={() => {
                setOpen(false);
            }}
            outsideclick
        >
            <Flex row="row"> 
                <Flex padding="0 !important" md={12} sm={12} xs={12}>
                    <Typography   fntsize={"cardTitleFontSize"} fntweight="bold">
                        {t("invoice_id")}{" "}{":"}{" "}{data?.invoice_id||"---"}
                    </Typography>

                    <Typography txtalign="left" margin="0 5px">
                        {t("customer_name")}{" "}{":"}{" "}{data?.customer_name}
                    </Typography>

                    <Typography txtalign="left" margin="0 5px">
                        {t("customer_mobile")}{" "}{":"}{" "}{data?.customer_mobile}
                    </Typography>
                      <Typography txtalign="left" margin="0 5px">
                        {t("customer_location")}{" "}{":"}{" "}{data?.customer_location}
                    </Typography>
                    <Typography txtalign="left" margin="0 0 0 5px">
                        {t("order_total_price")}{" "}{":"}{" "}{data?.order_total_price}
                    </Typography>
                    <Typography txtalign="left" margin="0 0 0 5px">
                        {t("order_date")}{" "}{":"}{" "}{data?.order_date}
                    </Typography>
                    {
                        data?.delivery_name ? <Typography txtalign="left" margin="0 0 10px 5px">
                            {t("courier_name")}{" "}{":"}{" "}{data?.delivery_name}
                        </Typography> : ""
                    }
                    <CardBody>
                        <DataGrid
                            colums={colums}
                            rows={Data || []}
                        />
                    </CardBody>

                </Flex>
            </Flex>

        </Modal>
    </>
    );
};
