interface ProductProps {
  id: string;
  title: string;
  price: number;
  currency: string;
  permalink: string;
  thumbnail: string;
  availableQuantity: number;
}

export class Product {
  public id: string;
  public title: string;
  public price: number;
  public currency: string;
  public permalink: string;
  public thumbnail: string;
  public availableQuantity: number;

  constructor(props: ProductProps) {
    this.id = props.id;
    this.title = props.title;
    this.price = props.price;
    this.currency = props.currency;
    this.permalink = props.permalink;
    this.thumbnail = props.thumbnail;
    this.availableQuantity = props.availableQuantity;
  }
}
