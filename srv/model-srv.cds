using {
    PO_HEADER_VIEW as Headers,
    PO_ITEM_VIEW   as Items,
    PO_BASIC_VIEW  as CalcView
} from '../db/model.cds';

service POService {
    @readonly 
    entity POCalcView as projection on CalcView;

    entity POHeaders as projection on Headers;

    entity POItems as projection on Items;

    function getPOItems() returns array of POItems;

}