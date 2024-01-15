import pandas as pd


def main(filename_inventory: str, filename_catalogue: str) -> None:
    """function that given two filenames (inventory and catalogue)
    performs a join on the column <item_id> for the last entry of the inventory"""

    # load inventory data (note it expects .tsv file)
    inventory_data = pd.read_csv(filename_inventory, sep="\t")

    # remove nans
    inventory_data.dropna(inplace=True)

    # parse the datetime from the inventory column (string)
    # sort the dates then get the date of the last inventory update
    inventory_data["inventory_date"] = pd.to_datetime(
        inventory_data["inventory_date"], errors="coerce", format="%d-%m-%Y"
    )
    inventory_data = inventory_data.sort_values("inventory_date")
    date_of_last_entry = inventory_data["inventory_date"].unique()[-1]

    # select only the inventory update for the last date
    inventory_data = inventory_data[
        inventory_data["inventory_date"] == date_of_last_entry
    ]

    # select only inventory entries with available stock
    inventory_data = inventory_data[inventory_data["stock"] != 0]

    # lets now load the catalogue (note it expects a .tsv file)
    catalogue_data = pd.read_csv(filename_catalogue, sep="\t")

    # perform the join operation on the inventory and catolgue on column <item_id>
    data = inventory_data.set_index("item_id").join(
        catalogue_data.set_index("item_id"),
        on="item_id",
        lsuffix="_caller",
        rsuffix="_other",
    )

    # cast index (item_id) as a integer
    data.index = data.index.astype(int)

    # reorder the data alphabetically A-Z using the 'name' column
    data.sort_values("name", ascending=True, inplace=True)

    # save to file
    data.to_csv("data/data.tsv", sep="\t")


if __name__ == "__main__":
    filename_inventory = "data/inventory.tsv"
    filename_catalogue = "data/catalogue.tsv"

    main(filename_inventory=filename_inventory, filename_catalogue=filename_catalogue)
