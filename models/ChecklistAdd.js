class ChecklistAddModel {
  constructor(
    id,
    type,
    amount_of_milk_produced,
    number_of_cows_head,
    had_supervision,
    farmer_name,
    farmer_city,
    from,
    to,
    created_at,
    updated_at
  ) {
    this.id = id;
    this.type = type;
    this.amount_of_milk_produced = amount_of_milk_produced;
    this.number_of_cows_head = number_of_cows_head;
    this.had_supervision = had_supervision;
    this.farmer = { name: farmer_name, city: farmer_city };
    this.from = { name: from };
    this.to = { name: to };
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

export default ChecklistAddModel;
