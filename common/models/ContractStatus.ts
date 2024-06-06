export class ContractStatus {
  public readonly id: number;
  public readonly name: string;
  public readonly color: string;

  private constructor(id: number, name: string, color: string) {
    this.id = id;
    this.name = name;
    this.color = color;
  }

  static ACTIVE = new ContractStatus(1, "Active", "#0DA31399");
  static INACTIVE = new ContractStatus(2, "Inactive", "#FF000099");
  static PENDING = new ContractStatus(3, "Pending", "#FFA50099");
  static CANCELLED = new ContractStatus(4, "Cancelled", "#FF000099");

  static values = [
    ContractStatus.ACTIVE,
    ContractStatus.INACTIVE,
    ContractStatus.PENDING,
    ContractStatus.CANCELLED,
  ];

  static fromId(id: number): ContractStatus {
    return ContractStatus.values.find((status) => status.id === id)!;
  }
}
