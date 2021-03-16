using Stats as StatsSource from '../db/schema';

service Catalog {

    entity Stats as projection on StatsSource;
}
