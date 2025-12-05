"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function BenchmarksSection() {
  return (
    <section id="benchmarks" className="bg-muted/30 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Model Performance
            </h2>
          </div>

          <Tabs defaultValue="confusion" className="w-full">
            <TabsList className="mx-auto mb-8 grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="confusion">Confusion Matrix</TabsTrigger>
              <TabsTrigger value="training">Training History</TabsTrigger>
              <TabsTrigger value="heatmaps">Grad-CAM</TabsTrigger>
            </TabsList>

            <TabsContent value="confusion">
              <Card>
                <CardHeader>
                  <CardTitle>Normalized Confusion Matrix</CardTitle>
                  <CardDescription>
                    Shows the proportion of correct predictions for each class.
                    Diagonal values represent accuracy per class.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center">
                    <img
                      src="/images/confusion-matrix.png"
                      alt="Normalized Confusion Matrix showing high accuracy across all tumor classes"
                      className="max-h-[500px] rounded-lg object-contain"
                    />
                  </div>
                  <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                      {
                        label: "Glioma",
                        accuracy: "93%",
                        description: "High recall with minimal confusion",
                      },
                      {
                        label: "Meningioma",
                        accuracy: "87%",
                        description: "Some confusion with no-tumor class",
                      },
                      {
                        label: "No Tumor",
                        accuracy: "100%",
                        description: "Perfect classification rate",
                      },
                      {
                        label: "Pituitary",
                        accuracy: "100%",
                        description: "Perfect classification rate",
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-lg bg-muted/50 p-4 text-center"
                      >
                        <p className="text-2xl font-bold text-primary">
                          {item.accuracy}
                        </p>
                        <p className="font-medium">{item.label}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="training">
              <Card>
                <CardHeader>
                  <CardTitle>Training vs Validation Metrics</CardTitle>
                  <CardDescription>
                    Loss and accuracy curves over 30 training epochs showing
                    model convergence and generalization.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center">
                    <img
                      src="/images/training-history.png"
                      alt="Training and validation loss/accuracy curves over 30 epochs"
                      className="max-h-[400px] rounded-lg object-contain"
                    />
                  </div>
                  <div className="mt-8 grid gap-4 sm:grid-cols-3">
                    {[
                      {
                        label: "Final Training Accuracy",
                        value: "~97%",
                        color: "text-blue-500",
                      },
                      {
                        label: "Final Validation Accuracy",
                        value: "~95%",
                        color: "text-red-500",
                      },
                      {
                        label: "Convergence",
                        value: "~20 epochs",
                        color: "text-green-500",
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-lg bg-muted/50 p-4 text-center"
                      >
                        <p className={`text-2xl font-bold ${item.color}`}>
                          {item.value}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="heatmaps">
              <Card>
                <CardHeader>
                  <CardTitle>Grad-CAM Visualization</CardTitle>
                  <CardDescription>
                    Gradient-weighted Class Activation Mapping shows which
                    regions the model focuses on for predictions. Red/yellow
                    areas indicate high activation regions used for
                    classification.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center">
                    <img
                      src="/images/image.png"
                      alt="Grad-CAM heatmaps showing model attention on tumor regions in MRI scans"
                      className="max-h-[600px] rounded-lg object-contain"
                    />
                  </div>
                  <div className="mt-8 rounded-lg bg-muted/50 p-6">
                    <h4 className="mb-3 font-semibold">
                      How to Read the Heatmaps
                    </h4>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <p className="mb-1 font-medium">Original</p>
                        <p className="text-sm text-muted-foreground">
                          The input MRI scan as provided to the model
                        </p>
                      </div>
                      <div>
                        <p className="mb-1 font-medium">Grad-CAM Heatmap</p>
                        <p className="text-sm text-muted-foreground">
                          Highlights regions of interest (red = high importance)
                        </p>
                      </div>
                      <div>
                        <p className="mb-1 font-medium">Overlay</p>
                        <p className="text-sm text-muted-foreground">
                          Combined view showing model focus areas on the scan
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
