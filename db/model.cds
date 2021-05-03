@cds.persistence.exists
entity![PO_HEADER_VIEW]{
    key![PURCHASEORDERID]       : Integer       @title : 'PURCHASEORDERID';
       ![CREATED_BY_EMPLOYEEID] : Integer       @title : 'CREATED_BY_EMPLOYEEID';
       ![CREATED_AT]            : Date          @title : 'CREATED_AT';
       ![PARTNER_ID]            : Integer       @title : 'PARTNER_ID';
       ![CURRENCY]              : String(5)     @title : 'CURRENCY';
       ![GROSSAMOUNT]           : Decimal(15, 2)@title : 'GROSSAMOUNT';
       ![NETAMOUNT]             : Decimal(15, 2)@title : 'NETAMOUNT';
       ![TAXAMOUNT]             : Decimal(15, 2)@title : 'TAXAMOUNT';
}

@cds.persistence.exists
entity![PO_ITEM_VIEW]{
    key![PURCHASEORDERID] : Integer       @title : 'PURCHASEORDERID';
    key![PRODUCTID]       : String(10)    @title : 'PRODUCTID';
       ![CURRENCY]        : String(5)     @title : 'CURRENCY';
       ![GROSSAMOUNT]     : Decimal(15, 2)@title : 'GROSSAMOUNT';
       ![NETAMOUNT]       : Decimal(15, 2)@title : 'NETAMOUNT';
       ![TAXAMOUNT]       : Decimal(15, 2)@title : 'TAXAMOUNT';
       ![QUANTITY]        : Decimal(13, 3)@title : 'QUANTITY';
       ![QUANTITYUNIT]    : String(3)     @title : 'QUANTITYUNIT';
       ![DELIVERYDATE]    : Date          @title : 'DELIVERYDATE';
}

@cds.persistence.exists
entity![PO_BASIC_VIEW]{
    key![PURCHASEORDERID]       : Integer       @title : 'PURCHASEORDERID';
       ![CREATED_BY_EMPLOYEEID] : Integer       @title : 'CREATED_BY_EMPLOYEEID';
       ![CREATED_AT]            : Date          @title : 'CREATED_AT';
       ![CHANGED_BY_EMPLOYEEID] : Integer       @title : 'CHANGED_BY_EMPLOYEEID';
       ![CHANGED_AT]            : Date          @title : 'CHANGED_AT';
       ![PARTNER_ID]            : Integer       @title : 'PARTNER_ID';
       ![CURRENCY]              : String(5)     @title : 'CURRENCY';
       ![GROSSAMOUNT]           : Decimal(15, 2)@title : 'GROSSAMOUNT';
       ![NETAMOUNT]             : Decimal(15, 2)@title : 'NETAMOUNT';
       ![TAXAMOUNT]             : Decimal(15, 2)@title : 'TAXAMOUNT';
       ![LIFECYCLESTATUS]       : String(1)     @title : 'LIFECYCLESTATUS';
       ![APPROVALSTATUS]        : String(1)     @title : 'APPROVALSTATUS';
       ![CONFIRMSTATUS]         : String(1)     @title : 'CONFIRMSTATUS';
       ![ORDERINGSTATUS]        : String(1)     @title : 'ORDERINGSTATUS';
       ![INVOICINGSTATUS]       : String(1)     @title : 'INVOICINGSTATUS';
}
