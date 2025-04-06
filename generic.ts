type Transformation<Input, Output> = (data: Input) => Output;

function createPipeline<InputType, OutputType>(
  validator: (data: unknown) => data is OutputType,
  ...transformations: Transformation<any, any>[]
): (initialData: InputType) => OutputType | Error {
  const pipe = (initialData: InputType): OutputType | Error => {
    let result: any = initialData;

    transformations.forEach((transform) => (result = transform(result)));

    return !validator(result) ? new Error("Invalid Type") : result;
  };

  return pipe;
}

type RawUser = {
  name: string;
  phoneNumber: string;
  locality: string;
  city: string;
  state: string;
};

type ProcessedUser = {
  name: string;
  email: string;
  phoneNumber: string;
  locality: string;
  city: string;
  state: string;
  address: string;
};

const isProcessedUser = (data: unknown): data is ProcessedUser => {
  return (
    typeof data === "object" &&
    data !== null &&
    "name" in data &&
    "email" in data &&
    "phoneNumber" in data &&
    "locality" in data &&
    "city" in data &&
    "state" in data &&
    "address" in data
  );
};

const firstPass: Transformation<RawUser, ProcessedUser> = (data) => {
  return { ...data, email: "", address: "" };
};

const secondPass: Transformation<ProcessedUser, ProcessedUser> = (data) => {
  return {
    ...data,
    email: data.name + "@gmail.com",
    address: data.locality + ", " + data.city + ", " + data.state,
  };
};

const pipeline = createPipeline<RawUser, ProcessedUser>(
  isProcessedUser,
  firstPass,
  secondPass
);

const rawUser: RawUser = {
  name: "Mohit",
  phoneNumber: "0123456789",
  locality: "Ansal Golf link 1",
  city: "Noida",
  state: "Uttar Pradesh",
};

const result = pipeline(rawUser);
console.log(result);

export {};
