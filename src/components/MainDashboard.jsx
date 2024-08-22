import React, { useContext, useState } from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from "./ui/input";
import { AppContext } from "../context/Context";
import Category from "./Category";


function MainDashboard() {
  const { handleAddWidget , categories , handleAddCategory} = useContext(AppContext);


  const [isOpenWidget, setIsOpenWidget] = useState(false);
  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [widgetData, setWidgetData] = useState({
    name: "",
    description: "",
  });
  const [categoryData, setCategoryData] = useState("");
  function handleClickAddWidget() {
    setIsOpenWidget(true);
  }
  function handleClickAddCategory() {
    setIsOpenCategory(true);
  }

  function handleWidgetData(e) {
    const { name, value } = e.target;
    setWidgetData((prevWidgetData) => {
      return { ...prevWidgetData, [name]: value, id: Date.now() };
    });
  }

  function addWidget() {
     if(selectedCategory){
        handleAddWidget(selectedCategory , widgetData);
        setWidgetData({
            name:"",
            description:""
        })
        setIsOpenWidget(false)
     }
  }
  function addCategory(){
      if(setCategoryData !== ""){
         handleAddCategory(categoryData);
         setCategoryData("");
         setIsOpenCategory(false)
      }
  }
  return (
    <>
      <div className="w-3/4 mx-auto py-8 px-4">
        <div className="flex justify-between">
          <h3 className="text-xl font-medium">CNAPP Dashboard</h3>
          <div className="flex gap-4">
            <Button
              className="bg-white text-black border-2 hover:bg-slate-100"
              onClick={handleClickAddCategory}
            >
              <Plus className="mr-2" /> Add Category
            </Button>
            <Button
              className="bg-white text-black border-2 hover:bg-slate-100"
              onClick={handleClickAddWidget}
            >
              <Plus className="mr-2" /> Add Widget
            </Button>
          </div>
        </div>
        <div className="w-full border my-4 rounded-md flex flex-col ">
        {categories.map(category => (
          <Category
            key={category.id}
            category={category}
            onRemoveWidget={(widgetId) => handleRemoveWidget(category.id, widgetId)}
          />
        ))}
      </div>
        <Dialog
          open={isOpenWidget ? isOpenWidget : isOpenCategory}
          onOpenChange={isOpenCategory ? setIsOpenCategory : setIsOpenWidget}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {isOpenCategory
                  ? "Are you absolutely wanted to add category?"
                  : "Are you absolutely wanted to add widget?"}
              </DialogTitle>
            </DialogHeader>
            <Card className="p-2">
              <CardHeader>
                <CardTitle className="text-center text-lg">
                  {isOpenCategory ? "Add Category" : "Add Widget"}
                </CardTitle>
              </CardHeader>

              {isOpenWidget ? (
                <>
                  <CardContent>
                    <div >
                      <Select  onValueChange={(value) => setSelectedCategory(value)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories?.map((category)=>{
                                return <SelectItem value={category?.id}>{category?.name}</SelectItem>
                            })}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                  <CardContent>
                    <div className="flex gap-4 items-center">
                      <label className="text-nowrap">Widget Name</label>
                      <Input
                        name="name"
                        value={widgetData.name}
                        onChange={handleWidgetData}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="flex gap-4 items-center w-full">
                      <label className="text-nowrap">Widget Description</label>
                      <Input
                        name="description"
                        value={widgetData.description}
                        onChange={handleWidgetData}
                      />
                    </div>
                  </CardFooter>
                </>
              ) : (
                <CardContent>
                  <div className="flex gap-4 items-center">
                    <label className="text-nowrap">Category Name</label>
                    <Input
                      value={categoryData}
                      onChange={(e) => {
                        setCategoryData(e.target.value);
                      }}
                    />
                  </div>
                </CardContent>
              )}
              <div className="flex justify-end pr-4">
                <Button onClick={isOpenCategory ? addCategory : addWidget}>
                  {isOpenCategory ? "Add Category" : "Add Widget"}
                </Button>
              </div>
            </Card>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default MainDashboard;
